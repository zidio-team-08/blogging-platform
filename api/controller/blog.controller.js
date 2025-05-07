import blogModel from '../model/blog.model.js';
import { blog_image_upload, deleteFilesFromCloudinary } from '../utils/uploadImage.js';
import { errorHandler } from '../middleware/errorMiddleware.js';


// senetize search query 
const sanitizeQuery = (query) => {
    if (typeof query !== 'string') return '';
    return query
        .trim()
        .replace(/\s+/g, ' ')
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .toLowerCase();
}

// create new blog story
export const createNewStory = async (req, res, next) => {
    try {
        const { title, content, tags } = req.body;
        const bannerImage = req.file;

        if (!title || !content || !tags && !bannerImage) {
            return next(new errorHandler('Please provide all the fields', 400));
        }

        const newBlog = new blogModel({
            title,
            content,
            tags,
            author: req.user.id,
        });

        const uploadResult = await blog_image_upload(bannerImage);

        newBlog.bannerImage = {
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id
        };

        await newBlog.save();

        const blogData = {
            id: newBlog._id,
            title: newBlog.title,
            content: newBlog.content,
            tags: newBlog.tags,
            author: newBlog.author,
            bannerImage: newBlog.bannerImage.url,
            likes: newBlog.likes.length,
            comments: newBlog.comments.length,
            createdAt: newBlog.createdAt,
            updatedAt: newBlog.updatedAt,
        };

        res.status(201).json({
            success: true,
            message: 'Story created successfully',
            data: blogData,
        });

    } catch (error) {
        return next(error);
    }
};

export const getBlogs = async (req, res, next) => {
    try {

        let query = req.query;

        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;

        if (page < 1) return next(new errorHandler('Page number cannot be less than 1', 400));

        if (limit < 3) return next(new errorHandler('Limit cannot be less than 3', 400));

        if (limit > 10) return next(new errorHandler('Limit cannot be greater than 10', 400));

        const blogs = await blogModel.find().populate('author', 'name username profileImage').lean().skip(skip).limit(limit);

        if (!blogs) return next(new errorHandler('No blogs found', 404));

        res.status(200).json({
            success: true,
            data: blogs,
            totalPages: Math.ceil(blogs.length / limit),
        });

    } catch (error) {
        return next(error);
    }
};

// edit blog
export const editStory = async (req, res, next) => {
    try {

        const { blogId, title, content, tags } = req.body;

        const bannerImage = req.file;

        if (!blogId) return next(new errorHandler('Please provide blog id', 400));

        if (!title && !content && !tags)
            return next(new errorHandler('Please provide at least one field to update', 400));

        const blog = await blogModel.findById(blogId);

        if (!blog) return next(new errorHandler('Blog not found', 404));

        if (blog.author.toString() !== req.user.id) {
            return next(new errorHandler('You are not authorized to edit this blog', 401));
        }

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

        blog.title = title;
        blog.content = content;
        blog.tags = tags;

        await blog.save();

        res.status(200).json({
            success: true,
            message: 'Post updated successfully',
            data: blog,
        });

    } catch (error) {
        return next(error);
    }
};

// delete blog
export const deleteBlog = async (req, res, next) => {
    try {
        const postId = req.params.id;

        if (!postId) return next(new errorHandler('Please provide blog id', 400));

        const post = await blogModel.findById(postId);

        if (!post) return next(new errorHandler('Blog not found', 404));

        if (post.author.toString() !== req.user.id) {
            return next(new errorHandler('You are not authorized to delete this post', 401));
        }

        await blogModel.deleteOne({ _id: postId });

        res.status(200).json({
            success: true,
            message: 'Post deleted successfully',
            data: {
                id: post._id,
            },
        });

    } catch (error) {
        return next(error);
    }
};

// like and unlike blog
export const blogLikeUnlike = async (req, res, next) => {
    try {

        const { blogId } = req.body;

        if (!blogId) return next(new errorHandler('Please provide blog id', 400));

        const blog = await blogModel.findById(blogId);

        if (!blog) return next(new errorHandler('Blog not found', 404));

        let msg = '';

        if (blog.likes.includes(req.user.id)) {
            blog.likes = blog.likes.filter(like => like.toString() !== req.user.id);
            msg = 'Post unliked successfully';
        } else {
            blog.likes.push(req.user.id);
            msg = 'Post liked successfully';
        }

        await blog.save();

        res.status(200).json({
            success: true,
            message: msg,
            data: {
                blogId: blog._id,
                likes: blog.likes.length,
            },
        });

    } catch (error) {
        return next(error);
    }
};

// search blog
export const searchBlog = async (req, res, next) => {
    try {

        const query = sanitizeQuery(req.query.query);

        if (!query) return next(new errorHandler('Please provide query', 400));

        const blogs = await blogModel.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { tags: { $regex: query, $options: 'i' } },
            ]
        }).populate('author', 'name username profileImage').lean();

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
        })

        res.status(200).json({
            success: true,
            data: updated,
        });

    } catch (error) {
        return next(error);
    }
}