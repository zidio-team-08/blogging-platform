import adminModel from '../model/admin.model.js';
import { errorHandler } from '../middleware/errorMiddleware.js';
import User from '../model/user.model.js';
import blogModel from '../model/blog.model.js';
import { blog_image_upload, deleteFilesFromCloudinary } from '../utils/uploadImage.js';


// senetize search query 
const sanitizeQuery = (query) => {
    if (typeof query !== 'string') return '';
    return query
        .trim()
        .replace(/\s+/g, ' ')
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .toLowerCase();
}
// create admin ============================== //
export const createAdmin = async (req, res, next) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return next(new errorHandler('Please provide all the fields', 400));
        }

        const admin = await adminModel.findOne({ email });
        if (admin) return next(new errorHandler('Admin already exists', 400));

        const newAdmin = new adminModel({
            email,
            password,
        });

        // check if name is provided
        if (name) newAdmin.name = name;

        await newAdmin.save();

        res.status(201).json({
            success: true,
            message: 'Admin created successfully',
            data: {
                id: newAdmin._id,
                name: newAdmin.name,
                email: newAdmin.email,
                role: newAdmin.role,
            },
        });

    } catch (error) {
        next(error);
    }
}

// login admin ============================== //
export const loginAdmin = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return next(new errorHandler('Please provide all the fields', 400));
        }

        const admin = await adminModel.findOne({ email }).select('+password');

        if (!admin) return next(new errorHandler('Admin not found', 404));

        const isMatch = await admin.comparePassword(password);

        if (!isMatch) return next(new errorHandler('Invalid password', 401));

        const token = await admin.generateToken();

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            }
        });

    } catch (error) {
        next(error);
    }
}

// logout admin ============================== //
export const logoutAdmin = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({
        success: true,
        message: "Logout successful",
    });
}

// get admin profile ================ //
export const getAdminProfile = async (req, res, next) => {
    try {
        const admin = await adminModel.findById(req.user.id).lean();

        if (!admin) return next(new errorHandler('Admin not found', 404));

        res.status(200).json({
            success: true,
            data: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
        });

    } catch (error) {
        next(error);
    }
}

// HANDLE ALL DASHBOARD RELATED ACTIONS
export const getDashboardStats = async (req, res, next) => {
    try {

        const recentUsersLimit = req.query.recentUsersLimit || 5;

        if (recentUsersLimit && recentUsersLimit < 1)
            return next(new errorHandler('Recent users limit cannot be less than 1', 400));

        if (recentUsersLimit && recentUsersLimit > 10)
            return next(new errorHandler('Recent users limit cannot be greater than 20', 400));


        const users = await User.find().sort({ createdAt: -1 }).lean();

        if (!users) return next(new errorHandler('No users found', 404));

        // const totalUsers = users.length;
        const totalUsers = await User.countDocuments().lean();
        const activeUsers = users.filter((user) => user.active).length;
        const blockedUsers = users.filter((user) => !user.active).length;

        const blogs = await blogModel.find().lean();

        if (!blogs) return next(new errorHandler('No blogs found', 404));
        const totalBlogs = await blogModel.countDocuments().lean();

        // recent users 
        const recentUsers = users.slice(0, recentUsersLimit);

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                activeUsers,
                blockedUsers,
                totalBlogs,
                recentJoinedUsers: recentUsers.map((user) => {
                    return {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        username: user.username,
                        role: user.role,
                        active: user.active,
                        bio: user?.bio,
                        profileImage: user?.profileImage?.url,
                        socialLinks: user?.socialLinks,
                        following: user?.following?.length,
                        followers: user?.followers?.length,
                        createdAt: user?.createdAt,
                    }
                }),
                recentJoinedUsersLimit: recentUsersLimit,
            },
        });

    } catch (error) {
        next(error);
    }
}

// HANDLE ALL USERS RELATED ACTIONS
// fetch all users ================== //
export const fetchUsers = async (req, res, next) => {
    try {

        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const search = sanitizeQuery(req.query.search);

        if (page < 1)
            return next(new errorHandler('Page number cannot be less than 1', 400));

        if (limit < 5)
            return next(new errorHandler('Limit cannot be less than 5', 400));

        if (limit > 10)
            return next(new errorHandler('Limit cannot be greater than 10', 400));

        // if search query is provided
        if (search) {
            const users = await User.find({
                $or: [
                    { username: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } }
                ]
            }).lean().skip(skip).limit(limit);

            if (!users) return next(new errorHandler('No users found', 404));

            const updated = users.map((user) => {
                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                    active: user.active,
                    bio: user?.bio,
                    profileImage: user?.profileImage?.url,
                    socialLinks: user?.socialLinks,
                    following: user?.following?.length,
                    followers: user?.followers?.length,
                    createdAt: user?.createdAt,
                }
            })

            return res.status(200).json({
                success: true,
                data: updated,
            });
        }

        const users = await User.find().lean().skip(skip).limit(limit);

        if (!users) return next(new errorHandler('No users found', 404));

        const updated = users.map((user) => {
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                role: user.role,
                active: user.active,
                bio: user?.bio,
                profileImage: user?.profileImage?.url,
                socialLinks: user?.socialLinks,
                following: user?.following?.length,
                followers: user?.followers?.length,
                createdAt: user?.createdAt,
            }
        });

        return res.status(200).json({
            success: true,
            data: updated,
        });

    } catch (error) {
        next(error);
    }
}

// user block and unblock ======================= //
export const blockUnblockUser = async (req, res, next) => {
    try {

        let { userId, active } = req.body;

        if (!userId) return next(new errorHandler('Please provide userId', 400));

        if (active === undefined)
            return next(new errorHandler('Please provide active status', 400));

        if (active === null)
            return next(new errorHandler('Active status cannot be null', 400));

        // convert string to boolean
        if (active === 'true') active = true;
        if (active === 'false') active = false;

        if (typeof active !== 'boolean')
            return next(new errorHandler('Active status must be boolean', 400));

        const user = await User.findById(userId);

        if (!user) return next(new errorHandler('User not found', 404));

        let msg = active ?
            'User unblocked successfully' :
            'User blocked successfully';

        user.active = active;
        await user.save();

        res.status(200).json({
            success: true,
            message: msg,
        });

    } catch (error) {
        next(error);
    }
}

// get user details by id ======================= //
export const getUserDetailsById = async (req, res, next) => {
    try {

        const { userId } = req.params;

        if (!userId) return next(new errorHandler('Please provide userId', 400));
        const user = await User.findById(userId).lean();
        if (!user) return next(new errorHandler('User not found', 404));

        let userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            bio: user.bio,
            role: user.role,
            following: user.following.length,
            followers: user.followers.length,
        };

        if (user.profileImage?.url) {
            userData.profileImage = user.profileImage.url;
        }

        if (user.socialLinks) {
            userData.socialLinks = user.socialLinks;
        }

        return res.status(200).json({
            success: true,
            data: userData
        });

    } catch (error) {
        next(error);
    }

}

// HANDLE ALL BLOG RELATED ACTIONS

// get all blogs ====================== //
export const getBlogs = async (req, res, next) => {
    try {

        let query = req.query;

        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;

        if (page < 1) return next(new errorHandler('Page number cannot be less than 1', 400));

        if (limit < 3) return next(new errorHandler('Limit cannot be less than 3', 400));

        if (limit > 10) return next(new errorHandler('Limit cannot be greater than 10', 400));

        const blogs = await blogModel.find()
            .populate('author', 'name username profileImage')
            .sort({ createdAt: -1 }).lean().skip(skip).limit(limit);

        if (!blogs) return next(new errorHandler('No blogs found', 404));

        const updated = blogs.map((blog) => {
            return {
                id: blog._id,
                title: blog.title,
                author: {
                    id: blog.author._id,
                    name: blog.author.name,
                    username: blog.author.username,
                    profileImage: blog.author.profileImage.url,
                },
                tags: blog.tags,
                bannerImage: blog.bannerImage.url,
                comments: blog.comments.length,
                likes: blog.likes.length,
                createdAt: blog.createdAt,
                updatedAt: blog.updatedAt,
            }
        });

        res.status(200).json({
            success: true,
            data: updated,
        });

    } catch (error) {
        next(error);
    }
}

// get blog details by id ====================== //
export const getBlogDetailsById = async (req, res, next) => {
    try {

        const { blogId } = req.params;

        if (!blogId) return next(new errorHandler('Please provide blogId', 400));

        const blog = await blogModel.findById(blogId)
            .populate('author', 'name username profileImage')
            .lean();

        if (!blog) return next(new errorHandler('Blog not found', 404));

        const blogData = {
            id: blog._id,
            title: blog.title,
            content: blog.content,
            tags: blog.tags,
            author: {
                id: blog.author._id,
                name: blog.author.name,
                username: blog.author.username,
                profileImage: blog.author.profileImage.url,
            },
            bannerImage: blog.bannerImage.url,
            comments: blog.comments.length,
            likes: blog.likes.length,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
        };

        res.status(200).json({
            success: true,
            data: blogData,
        });

    } catch (error) {
        next(error);
    }
}


// update blog ====================== //
export const updateBlog = async (req, res, next) => {
    try {

        const { blogId, title, content, tags } = req.body;
        const bannerImage = req.file;

        const newTags = typeof tags === 'string' ? JSON.parse(tags) : tags;

        if (!blogId) return next(new errorHandler('Please provide blogId', 400));

        if (!title && !content && !newTags)
            return next(new errorHandler('Please provide at least one field to update', 400));

        const blog = await blogModel.findById(blogId);

        if (!blog) return next(new errorHandler('Blog not found', 404));


        if (bannerImage) {
            if (blog.bannerImage.public_id) {
                await deleteFilesFromCloudinary(blog.bannerImage.public_id);
            }

            const uploadResult = await blog_image_upload(bannerImage);

            blog.bannerImage = {
                url: uploadResult.secure_url,
                public_id: uploadResult.public_id
            };
        }

        if (title) blog.title = title;
        if (content) blog.content = content;
        if (tags) blog.tags = newTags;

        await blog.save();

        const updatedData = {
            id: blog._id,
            title: blog.title,
            content: blog.content,
            tags: blog.tags,
            author: blog.author,
             bannerImage: blog.bannerImage?.url || null,
            likes: blog.likes.length,
            comments: blog.comments.length,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
        };

        res.status(200).json({
            success: true,
            message: 'Blog updated successfully',
            data: updatedData,
        });

    } catch (error) {
        console.log(error);
        return next(error);
    }
}

// delete blog ====================== //
export const deleteBlog = async (req, res, next) => {
    try {

        const blogId = req.params.blogId;

        if (!blogId) return next(new errorHandler('Please provide blogId', 400));

        const blog = await blogModel.findById(blogId);

        if (!blog) return next(new errorHandler('Blog not found', 404));

        await blogModel.deleteOne({ _id: blogId });

        res.status(200).json({
            success: true,
            message: 'Blog deleted successfully',
            data: {
                id: blog._id,
            },
        });

    } catch (error) {
        next(error);
    }
}


