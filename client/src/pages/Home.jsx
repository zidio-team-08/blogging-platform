import React from 'react';
import Feed from '../components/Feed';

const mockBlogs = [
    {
        _id: 1,
        title: 'Mastering React in 30 Days',
        description: 'Learn how to master React.js step-by-step, covering hooks, context API, and more...',
        author: 'Lakshmisha Achar',
        createdAt: '2025-04-25',
    },
    {
        _id: 2,
        title: '10 Tailwind CSS Tips You Need',
        description: 'Discover powerful Tailwind tricks to make your UI stunning and responsive...',
        author: 'Mohan Kumar',
        createdAt: '2025-04-22',
    },
    // Add more dummy blogs if needed
];

const Home = () => {
    return (
        <>
            <div className="w-full min-h-screen">
                <Feed />
            </div>
        </>
    );
};

export default Home;
