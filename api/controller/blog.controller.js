import blogModel from '../model/blog.model.js';
import User from '../model/user.model.js'; // Make sure you import your User model
import { blog_image_upload, deleteFilesFromCloudinary } from '../utils/uploadImage.js';
import { errorHandler } from '../middleware/errorMiddleware.js';
import commentModel from '../model/comment.model.js';

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
      let { title, content, tags } = req.body;
      const bannerImage = req.file;

      const newTags = typeof tags === 'string' ? JSON.parse(tags) : tags;

      if (!title) return next(new errorHandler('Please provide title', 400));
      if (!content) return next(new errorHandler('Please provide content', 400));
      if (!newTags || newTags?.length <= 0) return next(new errorHandler('Please provide tags', 400));
      if (newTags.length < 1) return next(new errorHandler('Please select at least one topic', 400));
      if (newTags.length > 5) return next(new errorHandler('You can select up to 5 topics only', 400));
      if (!bannerImage) return next(new errorHandler('Please provide banner image', 400));

      const newBlog = new blogModel({
         title,
         content,
         tags: newTags,
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

// show all the blogs

export const getBlogs = async (req, res, next) => {

   try {

      let query = req.query;

      const page = query.page || 1;
      const limit = parseInt(query.limit) || 10;
      const skip = (page - 1) * limit;
      const search = sanitizeQuery(query.query);

      if (page < 1) return next(new errorHandler('Page number cannot be less than 1', 400));

      if (limit < 1) return next(new errorHandler('Limit cannot be less than 1', 400));

      if (limit > 10) return next(new errorHandler('Limit cannot be greater than 10', 400));

      const filter = search
         ? { tags: { $regex: search, $options: 'i' } }
         : {};

      const blogs = await blogModel.find(filter)
         .populate('author', 'name username profileImage')
         .lean()
         .skip(skip)
         .limit(limit)
         .sort({ createdAt: -1 });

      if (!blogs || blogs.length <= 0)
         return next(new errorHandler('No blogs found', 404));

      // Get comment counts in one query
      const commentCounts = await commentModel.aggregate([
         {
            $match: {
               blogId: { $in: blogs.map((b) => b._id) }
            }
         },
         {
            $group: {
               _id: "$blogId",
               count: { $sum: 1 }
            }
         }
      ]);

      // Convert commentCounts to a Map for quick lookup
      const commentMap = new Map();
      commentCounts.forEach(item => {
         commentMap.set(item._id.toString(), item.count);
      });

      const updated = blogs.map((blog) => {
         const commentCount = commentMap.get(blog._id.toString()) || 0;

         return {
            id: blog._id,
            title: blog.title,
            author: {
               id: blog.author?._id || null,
               name: blog.author?.name || "Unknown",
               username: blog.author?.username || "unknown",
               profileImage: blog.author?.profileImage?.url || null,
            },
            tags: blog.tags || [],
            bannerImage: blog.bannerImage?.url || null,
            comments: commentCount || 0,
            likes: blog.likes?.length || 0,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
         };
      });

      res.status(200).json({
         success: true,
         data: updated,
      });

   } catch (error) {
      return next(error);
   }
};

// show only user blogs for my stories
export const getUserBlogs = async (req, res, next) => {

   try {

      let query = req.query;

      const page = query.page || 1;
      const limit = query.limit || 10;
      const skip = (page - 1) * limit;

      if (page < 1) return next(new errorHandler('Page number cannot be less than 1', 400));

      if (limit < 3) return next(new errorHandler('Limit cannot be less than 3', 400));

      if (limit > 10) return next(new errorHandler('Limit cannot be greater than 10', 400));

      const blogs = await blogModel
         .find({ author: req.user._id })
         .populate('author', 'name username profileImage')
         .lean()
         .skip(skip)
         .limit(limit);

      if (!blogs || blogs.length === 0) return next(new errorHandler('No blogs found', 404));

      const updated = blogs.map((blog) => {
         return {
            id: blog._id,
            title: blog.title,
            author: {
               id: blog.author?._id || null,
               name: blog.author?.name || "Unknown",
               username: blog.author?.username || "unknown",
               profileImage: blog.author?.profileImage?.url || null,
            },
            tags: blog.tags || [],
            bannerImage: blog.bannerImage?.url || null,
            comments: blog.comments?.length || 0,
            likes: blog.likes?.length || 0,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
         };
      });


      res.status(200).json({
         success: true,
         data: updated,
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

      const newTags = typeof tags === 'string' ? JSON.parse(tags) : tags;

      if (!blogId) return next(new errorHandler('Please provide blogId', 400));

      if (!title && !content && !newTags)
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
         bannerImage: blog.bannerImage.url,
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
            likes: blog.likes,
            likes: blog.likes.length,
            isLiked: blog.likes.map(like => like.toString()).includes(req.user.id),
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
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      if (!query) return next(new errorHandler('Please provide query', 400));

      const blogs = await blogModel.find({
         $or: [
            { title: { $regex: query, $options: 'i' } },
            { tags: { $regex: query, $options: 'i' } },
         ]
      }).populate('author', 'name username profileImage').lean().skip(skip).limit(limit);

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

// get blog details by id
export const getBlogDetailsById = async (req, res, next) => {
   try {

      const { blogId } = req.params;

      if (!blogId) return next(new errorHandler('Please provide blogId', 400));

      const blog = await blogModel.findById(blogId)
         .populate('author', 'name username profileImage bio')
         .lean();

      if (!blog) return next(new errorHandler('Blog not found', 404));

      const user = await User.findById(req.user.id).lean();

      const isFollowing = user.following.map((id) => id.toString()).includes(blog.author._id.toString());
      const isLiked = blog.likes.map((id) => id.toString()).includes(req.user.id);
      const commentCount = await commentModel.countDocuments({ blogId: blog._id }).lean();

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
            authorBio: blog.author.bio,
         },
         bannerImage: blog.bannerImage.url,
         comments: commentCount,
         likes: blog.likes.length,
         isFollowing,
         isLiked,
         createdAt: blog.createdAt,
         updatedAt: blog.updatedAt,
      };

      res.status(200).json({
         success: true,
         data: blogData,
      });

   } catch (error) {
      return next(error);
   }
}
