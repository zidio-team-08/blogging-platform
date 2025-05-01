import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import { FiClock, FiMessageSquare, FiShare2, FiBookmark, FiHeart } from 'react-icons/fi';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import '../assets/css/like-button.css';

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

const Blog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Mock fetching blog data
        // In a real app, you would fetch from your API
        setTimeout(() => {
            const blogData = {
                id: id,
                title: "Getting Started with React Hooks",
                content: "React Hooks were introduced in React 16.8 as a way to use state and other React features without writing a class component. They let you 'hook into' React state and lifecycle features from function components.\n\nHooks solve many problems that React developers faced over the years, including complex component hierarchies, wrapper hell from render props and higher-order components, and difficulty sharing stateful logic between components.\n\nIn this comprehensive guide, we'll explore the most commonly used React Hooks and how they can simplify your components while making your code more reusable and easier to test.\n\n## useState Hook\n\nThe useState hook lets you add state to functional components. It returns a stateful value and a function to update it.\n\n```jsx\nconst [count, setCount] = useState(0);\n```\n\n## useEffect Hook\n\nThe useEffect hook lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes.\n\n```jsx\nuseEffect(() => {\n  document.title = `You clicked ${count} times`;\n}, [count]);\n```\n\n## useContext Hook\n\nThe useContext hook accepts a context object and returns the current context value for that context.\n\n```jsx\nconst value = useContext(MyContext);\n```",
                author: "Jane Smith",
                authorBio: "Senior Frontend Developer at TechCorp. Passionate about React and modern web development.",
                authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
                date: "May 15, 2023",
                readTime: "8 min read",
                likes: 42,
                comments: 8,
                image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070",
                tags: ["React", "JavaScript", "Web Development", "Hooks"]
            };

            setBlog(blogData);
            setLikeCount(blogData.likes);

            setComments([
                {
                    id: 1,
                    author: "Alex Johnson",
                    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                    content: "Great article! I've been using hooks for a while now and they've completely changed how I write React code.",
                    date: "2 days ago",
                    likes: 5,
                    isLiked: false
                },
                {
                    id: 2,
                    author: "Sarah Miller",
                    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
                    content: "The useContext example was particularly helpful. I've been struggling with prop drilling in my application.",
                    date: "1 day ago",
                    likes: 3,
                    isLiked: false
                }
            ]);

            setLoading(false);
        }, 1000);
    }, [id]);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    const handleCommentLike = (commentId) => {
        setComments(prev => prev.map(comment => {
            if (comment.id === commentId) {
                const newIsLiked = !comment.isLiked;
                return {
                    ...comment,
                    likes: newIsLiked ? comment.likes + 1 : comment.likes - 1,
                    isLiked: newIsLiked
                };
            }
            return comment;
        }));
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        // In a real app: api.post(`/blogs/${id}/bookmark`, { bookmarked: !isBookmarked })
    };

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
        // In a real app: api.post(`/users/${blog.authorId}/follow`, { following: !isFollowing })
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        const newComment = {
            id: Date.now(),
            author: "You",
            avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
            content: comment,
            date: "Just now",
            likes: 0,
            isLiked: false
        };

        setComments([newComment, ...comments]);
        setComment('');
        setBlog(prev => ({
            ...prev,
            comments: prev.comments + 1
        }));

        // In a real app: api.post(`/blogs/${id}/comments`, { content: comment })
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="w-full min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4 mt-5">
                    {blog.tags.map(tag => (
                        <Link key={tag} to={`/tag/${tag}`} className="px-3 py-1 bg-base-200 rounded-full text-sm hover:bg-base-300 transition-colors font-semibold">
                            {tag}
                        </Link>
                    ))}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold my-8">{blog.title}</h1>

                {/* Author info with follow button */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <img
                            src={blog.authorAvatar}
                            alt={blog.author}
                            className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                        />
                        <div>
                            <p className="font-medium text-lg">{blog.author}</p>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <span>{blog.date}</span>
                                <span className="flex items-center gap-1"><FiClock size={14} /> {blog.readTime}</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleFollow}
                        className={`px-4 py-1.5 rounded-full cursor-pointer text-sm font-medium transition-colors ${isFollowing
                            ? 'bg-primary text-white hover:bg-primary/90'
                            : 'border border-primary text-primary hover:bg-primary/10'
                            }`}
                    >
                        {isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
                </div>

                <div className="flex items-center justify-between py-4 mb-8 border-t border-b border-base-300">
                    <div className="flex gap-4">
                        <LikeButton
                            likes={likeCount}
                            isLiked={isLiked}
                            onLike={handleLike}
                        />
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full">
                            <FiMessageSquare size={20} /> <span>{blog.comments}</span>
                        </button>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={handleBookmark}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${isBookmarked ? 'text-primary bg-primary/10' : 'hover:bg-gray-100'
                                }`}
                        >
                            <FiBookmark size={20} className={isBookmarked ? 'fill-primary' : ''} />
                            <span>Save</span>
                        </button>
                        <button className="flex cursor-pointer items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors">
                            <FiShare2 size={20} /> <span>Share</span>
                        </button>
                    </div>
                </div>


                {/* Featured image */}
                <div className="w-full h-80 md:h-[500px] rounded-md overflow-hidden mb-8 shadow-lg">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none mb-10">
                    {blog.content.split('\n\n').map((paragraph, index) => {
                        if (paragraph.startsWith('## ')) {
                            return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{paragraph.substring(3)}</h2>;
                        } else if (paragraph.startsWith('```')) {
                            const code = paragraph.split('\n').slice(1, -1).join('\n');
                            return (
                                <pre key={index} className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                                    <code>{code}</code>
                                </pre>
                            );
                        } else {
                            return <p key={index} className="mb-4">{paragraph}</p>;
                        }
                    })}
                </div>

                {/* Author bio */}
                <div className="bg-gray-50 px-6 py-3 border border-base-300 rounded-xl mb-10">
                    <h3 className="text-lg font-bold mb-2">About the author</h3>
                    <div className="flex items-start gap-4">
                        <img
                            src={blog.authorAvatar}
                            alt={blog.author}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <p className="font-medium">{blog.author}</p>
                            <p className="text-gray-600 mt-1">{blog.authorBio}</p>
                        </div>
                    </div>
                </div>

                {/* Comments section */}
                <div className="mt-10">
                    <h3 className="text-xl font-bold mb-6">Comments ({blog.comments})</h3>

                    {/* Comment form */}
                    <form onSubmit={handleCommentSubmit} className="mb-8">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                                <img
                                    src="https://randomuser.me/api/portraits/lego/1.jpg"
                                    alt="Your avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="w-full border rounded-sm p-3 min-h-[100px] border-base-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                ></textarea>
                                <div className="flex justify-end mt-2">
                                    <button
                                        type="submit"
                                        className="px-5 py-2 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors font-semibold cursor-pointer"
                                        disabled={!comment.trim()}
                                    >
                                        Post Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                    {/* Comments list */}
                    <div className="space-y-6">
                        {comments.map(comment => (
                            <div key={comment.id} className="flex gap-4">
                                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                    <img
                                        src={comment.avatar}
                                        alt={comment.author}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="bg-gray-50 p-4 rounded-md border border-base-300">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="font-medium">{comment.author}</p>
                                            <span className="text-sm text-gray-500">{comment.date}</span>
                                        </div>
                                        <p className="text-gray-700">{comment.content}</p>
                                    </div>
                                    <div className="flex gap-4 mt-2 ml-2">
                                        <button
                                            onClick={() => handleCommentLike(comment.id)}
                                            className={`text-sm flex items-center gap-1 ${comment.isLiked ? 'text-rose-500' : 'text-gray-500 hover:text-primary'}`}
                                        >
                                            <FiHeart className={comment.isLiked ? 'fill-rose-500' : ''} size={14} />
                                            Like ({comment.likes})
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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
