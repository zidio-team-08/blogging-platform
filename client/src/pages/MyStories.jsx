import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MyStories = () => {
    const [activeTab, setActiveTab] = useState("drafts");
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await axios.get('/api/blog/mystories', {
                    withCredentials: true, // if you're using cookies for auth
                    headers: token ? {
                        'Authorization': `Bearer ${token}`,
                    } : {},
                });
                setStories(response.data.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load stories.");
                setLoading(false);
            }
        };

        fetchStories();
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 md:mb-8 gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-base-content">My stories</h1>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    <Link to='/new-story' className="px-3 py-1 md:px-4 md:py-2 bg-primary text-white text-sm md:text-base rounded-md hover:bg-primary/80 font-semibold cursor-pointer transition-colors">
                        Write a story
                    </Link>
                </div>
            </div>

            <div className="border-b border-base-300 mb-4 md:mb-6">
                <nav className="flex -mb-px min-w-max">
                    <button
                        onClick={() => setActiveTab("drafts")}
                        className={`mr-4 sm:mr-8 py-3 md:py-4 text-sm md:text-base cursor-pointer ${activeTab === "drafts"
                            ? "text-base-content border-b-2 border-primary font-medium"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Published
                    </button>
                </nav>
            </div>

            {loading ? (
                <p>Loading stories...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : stories.length === 0 ? (
                <p>No stories found.</p>
            ) : (
                <div className="space-y-4 md:space-y-6">
                    {stories.map((story) => (
                        <div key={story.id} className="py-3 md:py-4 border-b border-base-300 flex flex-col md:flex-row gap-4">
                            <div className="flex-grow">
                                <h2 className="text-lg md:text-xl font-medium text-base-content mb-1">
                                    {story.title}
                                </h2>
                                <div className="flex flex-wrap items-center text-xs md:text-sm text-base-content">
                                    <span>Created {new Date(story.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            {story.bannerImage && (
                                <div className="w-full md:w-24 h-20 rounded-sm overflow-hidden flex-shrink-0">
                                    <img
                                        src={story.bannerImage}
                                        alt="Story cover"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyStories;
