import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const MyStories = () => {
    const [activeTab, setActiveTab] = useState("drafts");

    return (
        <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 md:mb-8 gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My stories</h1>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    <Link to='/new-story' className="px-3 py-1 md:px-4 md:py-2 bg-primary text-white text-sm md:text-base rounded-md hover:bg-primary/80 font-semibold cursor-pointer transition-colors">
                        Write a story
                    </Link>
                </div>
            </div>

            <div className="border-b border-gray-200 mb-4 md:mb-6">
                <nav className="flex -mb-px min-w-max">
                    <button
                        onClick={() => setActiveTab("drafts")}
                        className={`mr-4 sm:mr-8 py-3 md:py-4 text-sm md:text-base cursor-pointer ${activeTab === "drafts"
                            ? "text-gray-800 border-b-2 border-gray-800 font-medium"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Published
                    </button>
                </nav>
            </div>

            <div className="space-y-4 md:space-y-6">
                <div className="py-3 md:py-4 border-b border-gray-100 flex flex-col md:flex-row gap-4">
                    <div className="flex-grow">
                        <h2 className="text-lg md:text-xl font-medium text-gray-800 mb-1">This is a testing</h2>
                        <div className="flex flex-wrap items-center text-xs md:text-sm text-gray-500">
                            <span>Created 2 days ago</span>
                        </div>
                    </div>
                    <div className="w-full md:w-24 h-20 rounded-sm overflow-hidden flex-shrink-0">
                        <img
                            src="https://images.unsplash.com/photo-1633356122544-f134324a6cee"
                            alt="Story cover"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="py-3 md:py-4 border-b border-gray-100 flex flex-col md:flex-row gap-4">
                    <div className="flex-grow">
                        <h2 className="text-lg md:text-xl font-medium text-gray-800 mb-1">Untitled story</h2>
                        <div className="flex flex-wrap items-center text-xs md:text-sm text-gray-500">
                            <span>Created 2 days ago</span>
                        </div>
                    </div>
                    <div className="w-full md:w-24 h-20 rounded-sm overflow-hidden flex-shrink-0">
                        <img
                            src="https://images.unsplash.com/photo-1587620962725-abab7fe55159"
                            alt="Story cover"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyStories
