import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiClock, FiMessageSquare, FiShare2, FiBookmark } from 'react-icons/fi';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import '../assets/css/like-button.css';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hook/useAxios';
import { formatDate } from '../utils/utils';
import StoryComment from '../components/StoryComment';
import { useDispatch, useSelector } from 'react-redux';
import useApi from '../hook/api';
import { setBlogLike, setFollowingStatus } from '../features/userActionsSlice';
import toast from 'react-hot-toast';

const LikeButton = ({ likes, isLiked, onLike }) => {
    return (
        <div className="flex items-center gap-2">
            <div className="con-like">
                <input
                    className="like"
                    type="checkbox"
                    title="like"
                    checked={isLiked}
                    onChange={onLike}
                />
                <div className="checkmark">
                    <FaRegHeart size={20} />
                    <FaHeart className="filled" size={20} />
                    <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" className="celebrate">
                        <polygon className="poly" points="10,10 20,20"></polygon>
                        <polygon className="poly" points="10,50 20,50"></polygon>
                        <polygon className="poly" points="20,80 30,70"></polygon>
                        <polygon className="poly" points="90,10 80,20"></polygon>
                        <polygon className="poly" points="90,50 80,50"></polygon>
                        <polygon className="poly" points="80,80 70,70"></polygon>
                    </svg>
                </div>
            </div>
            <span className="font-medium">{likes}</span>
        </div>
    )
}

const idSanitizer = (id) => {
    if (typeof id !== 'string') return '';
    return id.replace(/[^a-zA-Z0-9]/g, '');
}

const Blog = () => {
    const { id } = useParams();
    const [isBookmarked, setIsBookmarked] = useState(false);
    const blogId = idSanitizer(id);
    const { fetchData } = useAxios();
    const { followUnfollow, likeUnlikeBlog } = useApi();
    const dispatch = useDispatch();
    const { followingStatus, blogLikesStatus, commentLikesStatus } = useSelector((state) => state.userActions);

    const { data: blog, isPending, isError, error } = useQuery({
        queryKey: ["BLOG", blogId],
        queryFn: async () => await fetchData({
            url: `/api/blog/${blogId}`,
            method: 'GET',
        }),
        refetchOnWindowFocus: false,
        enabled: !!blogId,
        staleTime: 0,
        cacheTime: 0,
    });

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    // Derive isLiked from local state or backend
    const isLiked = blogLikesStatus?.[blogId] !== undefined
        ? blogLikesStatus[blogId]
        : blog?.data?.isLiked;

    // Derive like count based on optimistic UI
    const baseLikes = blog?.data?.likes || 0;
    const backendLiked = blog?.data?.isLiked;
    let likeCount = baseLikes;

    if (blogLikesStatus?.[blogId] !== undefined) {
        if (blogLikesStatus[blogId] && !backendLiked) likeCount = baseLikes + 1;
        if (!blogLikesStatus[blogId] && backendLiked) likeCount = baseLikes - 1;
    }

    // handle follow
    const handleFollow = async () => {
        const userId = blog?.data?.author?.id;
        const isFoll = blog?.data?.isFollowing;
        const isFollowing = !(followingStatus[userId] ?? isFoll);
        dispatch(setFollowingStatus({ [userId]: isFollowing }));
        const updatedStatus = await followUnfollow(userId, isFollowing);
        dispatch(setFollowingStatus({ [userId]: updatedStatus }));
    };

    // Like/Unlike Handler with optimistic update and revert on error
    const likeUnlikeHandler = async () => {
        dispatch(setBlogLike({ [blogId]: !isLiked }));
        try {
            const updatedIsLiked = await likeUnlikeBlog({ blogId });
            dispatch(setBlogLike({ [blogId]: updatedIsLiked }));
        } catch (error) {
            dispatch(setBlogLike({ [blogId]: isLiked })); // revert
            toast.error(error?.message || "Failed to update like status");
        }
    };

    if (isPending) {
        return (
            <>
                <div className="w-full min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex flex-wrap gap-2 mb-4 mt-5">
                    {blog?.data?.tags?.map((tag, index) => (
                        <Link key={`${tag}-${index}`} to='#' className="px-3 py-1 bg-base-200 rounded-full text-sm hover:bg-base-300 transition-colors font-semibold">
                            {tag}
                        </Link>
                    ))}
                </div>
                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold my-10">{blog?.data?.title}</h1>
                {/* Author info with follow button */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <img
                            src={blog?.data?.author?.profileImage}
                            alt={blog?.data?.author?.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                        />
                        <div>
                            <p className="font-medium text-lg">{blog?.data.author?.name || blog?.data?.auther?.username}</p>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <span>{formatDate(blog?.data?.createdAt)}</span>
                                <span className="flex items-center gap-1"><FiClock size={14} /> {blog.readTime}</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleFollow}
                        className={`px-4 py-1.5 rounded-full cursor-pointer text-sm font-medium transition-colors ${(followingStatus[blog?.data?.author?.id] ?? blog?.data?.isFollowing)
                            ? 'bg-primary text-white hover:bg-primary/90'
                            : 'border border-primary text-primary hover:bg-primary/10'
                            }`}
                    >
                        {(followingStatus[blog?.data?.author?.id] ?? blog?.data?.isFollowing) ? 'Unfollow' : 'Follow'}
                    </button>
                </div>

                <div className="flex items-center justify-between py-4 mb-8 border-t border-b border-base-300">
                    <div className="flex gap-4">
                        <LikeButton
                            likes={likeCount}
                            isLiked={isLiked}
                            onLike={likeUnlikeHandler}
                        />
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full">
                            <FiMessageSquare size={20} /> <span>{blog?.data?.comments}</span>
                        </button>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={handleBookmark}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${isBookmarked ? 'text-primary bg-primary/10' : 'hover:bg-gray-100'
                                }`}>
                            <FiBookmark size={20} className={isBookmarked ? 'fill-primary' : ''} />
                            <span>Save</span>
                        </button>
                        <button className="flex cursor-pointer items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors">
                            <FiShare2 size={20} /> <span>Share</span>
                        </button>
                    </div>
                </div>

                {/* Featured image */}
                <div className="w-full h-80 md:h-[500px] !rounded-none skeleton overflow-hidden mb-8">
                    <img
                        src={blog?.data?.bannerImage}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none mb-10">
                    <div dangerouslySetInnerHTML={{ __html: blog?.data?.content }} />
                </div>

                {/* Author bio */}
                <div className="bg-gray-50 px-6 py-3 border border-base-300 rounded-xl mb-10">
                    <h3 className="text-lg font-medium mb-1">About the author</h3>
                    <div className='w-full flex justify-between'>
                        <div className="flex items-start gap-5">
                            <img
                                src={blog?.data?.author?.profileImage}
                                alt={blog?.data?.author?.name || blog?.data?.author?.username}
                                className="w-12 h-12 rounded-full object-cover max-sm:hidden"
                            />
                            <div>
                                <p className="font-medium">{blog?.data?.author?.name || blog?.data?.author?.username}</p>
                                <p className="text-gray-600">{blog?.data?.author?.authorBio}</p>
                            </div>
                        </div>
                        <div className="flex gap-4 mt-2">
                            <button
                                onClick={handleFollow}
                                className={`px-4 py-1 rounded-full cursor-pointer text-sm font-medium transition-colors ${(followingStatus[blog?.data?.author?.id] ?? blog?.data?.isFollowing)
                                    ? 'bg-primary text-white hover:bg-primary/90'
                                    : 'border border-primary text-primary hover:bg-primary/10'
                                    }`}
                            >
                                {(followingStatus[blog?.data?.author?.id] ?? blog?.data?.isFollowing) ? 'Unfollow' : 'Follow'}
                            </button>
                        </div>
                    </div>

                </div>

                {/* Comments section */}
                <div className="mt-10">


                    {/* Comments list */}
                    <StoryComment blogId={blogId} />

                </div>

                {/* Related posts - placeholder */}
                <div className="mt-16">
                    <h3 className="text-xl font-bold mb-6">Related Posts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border border-base-300 rounded-md overflow-hidden hover:shadow-md transition-shadow">
                            <img
                                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070"
                                alt="Related post"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h4 className="font-bold text-lg mb-2">Understanding React Context API</h4>
                                <p className="text-gray-600 line-clamp-2">Learn how to use React Context API to avoid prop drilling and manage global state effectively.</p>
                            </div>
                        </div>
                        <div className="border border-base-300 rounded-md overflow-hidden hover:shadow-md transition-shadow">
                            <img
                                src="https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074"
                                alt="Related post"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h4 className="font-bold text-lg mb-2">Custom Hooks in React</h4>
                                <p className="text-gray-600 line-clamp-2">Learn how to create and use custom hooks to share logic between components.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blog
