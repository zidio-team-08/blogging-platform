import React from 'react'

const FeedSidebar = () => {

    const recommendedTopics = [
        "Programming",
        "React",
        "MongoDB",
        "Data Science",
        "Machine Learning",
        "AI",
        "Blockchain",
        "DevOps",
        "Cloud Computing",
        "Cybersecurity",
        "Software Engineering",
    ];

    const popularPosts = [
        {
            title: "React Hooks Guide",
            author: "Jane Smith",
            text: "Learn how to use React hooks effectively in your projects"
        },
        {
            title: "Tailwind CSS Tips",
            author: "John Doe",
            text: "Discover advanced techniques for Tailwind CSS styling"
        },
        {
            title: "MERN Stack Tutorial",
            author: "Alex Johnson",
            text: "Step-by-step guide to building full-stack applications"
        },
        {
            title: "GraphQL vs REST API",
            author: "Sarah Williams",
            text: "Comparing modern API approaches for web development"
        },
        {
            title: "Next.js 14 Features",
            author: "Michael Chen",
            text: "Exploring the latest updates in Next.js framework"
        },
    ];


    return (
        <div className='w-full max-w-[368px] border-l border-base-300 px-2 py-5'>
            <div>
                <h6 className="p-4 pb-2 text-md font-medium opacity-60 tracking-wide mb-2">Recommended Topics</h6>
                <div className="px-4 pb-4 flex flex-wrap gap-3">
                    {recommendedTopics.map(topic => (
                        <span
                            key={topic}
                            className="px-3 py-1.5 rounded-full text-sm font-medium bg-base-300 hover:bg-primary hover:text-white transition-colors duration-200 cursor-pointer"
                        >
                            {topic}
                        </span>
                    ))}
                </div>
            </div>
            <ul className="list mt-4 border-t border-base-200 pt-2">
                <li className="p-4 pb-2 text-md font-medium opacity-60 tracking-wide">Popular Blog Posts</li>
                {popularPosts.map((post, index) => (
                    <li key={index} className="list-row p-3 rounded-md transition-colors">
                        <div className="text-3xl font-bold text-primary/30 tabular-nums">0{index + 1}</div>
                        <div className="list-col-grow ml-3">
                            <h2 className="text-base font-semibold">{post.title}</h2>
                            <p className="text-xs mt-1 text-gray-600">{post.text}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs font-medium text-primary">{post.author}</span>
                                <span className="text-xs text-gray-500">• 2 days ago</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FeedSidebar
