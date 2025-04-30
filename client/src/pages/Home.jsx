import React from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/outline"; // Importing pencil icon
import NavBar from "../components/NavBar";
import { Link } from 'react-router-dom';
import img01 from "../assets/img01.jpg";
import img02 from "../assets/img02.jpg";
import img03 from "../assets/img03.png";
import img04 from "../assets/img04.jpg";
import img05 from "../assets/img05.png";
const articles = [
  {
    title: "Understanding Clean Architecture",
    description: "An overview of scalable software architecture principles.",
    date: "Apr 28, 2025",
    views: "1.2K",
    comments: "54",
    image: img01,
  },
  {
    title: "How I’d Learn AI in 2025",
    description: "What I’d do differently if I started learning machine learning today.",
    date: "Mar 14, 2025",
    views: "980",
    comments: "32",
    image: img02,
  },
  {
    title: "The Power of Consistency in Learning Code",
    description: "Why small daily progress beats intense weekly grind.",
    date: "Feb 20, 2025",
    views: "850",
    comments: "27",
    image: img03,
  },
  {
    title: "From Zero to Hero with JavaScript",
    description: "A roadmap to becoming a JavaScript developer in 2025.",
    date: "Jan 10, 2025",
    views: "1.5K",
    comments: "60",
    image: img04,
  },
  {
    title: "Should You Still Learn Web Development?",
    description: "Breaking down myths and facts about web development in 2025.",
    date: "Dec 18, 2024",
    views: "1.1K",
    comments: "41",
    image: img05,
  },
];



const staffPicks = [
  {
    name: "Daniel Gallagher",
    title: "What It’s Like Working for the Vatican",
    date: "Apr 22",
  },
  {
    name: "Vaibhavi Naik",
    title: "My Notes App Is a Beautiful Mess",
    date: "Apr 17",
  },
  {
    name: "Anjali Rao",
    title: "Coding After Midnight: A Ritual",
    date: "Apr 10",
  },
  {
    name: "Sahil Sharma",
    title: "Why I Stopped Using To-Do Lists",
    date: "Apr 3",
  },
  {
    name: "Rekha Desai",
    title: "Living Without Notifications for a Month",
    date: "Mar 28",
  },
  {
    name: "Karan Mehta",
    title: "The UI Design Mistakes I Keep Making",
    date: "Mar 20",
  },
  {
    name: "Nikita Joshi",
    title: "How I Made My Portfolio in One Weekend",
    date: "Mar 15",
  },
];


const Home = () => {
  return (
    <div className="bg-base-100 min-h-screen">
      {/* NavBar component */}
      <NavBar/>

      {/* Tabs */}
      <div className="tabs tabs-boxed max-w-4xl mx-auto mt-6 mb-8">
        <a className="tab tab-active text-primary">For You</a>
        <a className="tab">Trending</a>
        <a className="tab">AI</a>
        <a className="tab">Tech</a>
        <a className="tab">Career</a>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 max-w-7xl mx-auto px-4">
        {/* Articles Feed */}
        <div className="col-span-2 space-y-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="card card-side bg-base-200 shadow-lg hover:shadow-xl transition"
            >
              <figure className="w-44">
                <img
                  src={article.image}
                  alt="cover"
                  className="h-full w-full object-cover"
                />
              </figure>
              <div className="card-body">
                    <h2 className="card-title font-bold text-black">{article.title}</h2>
                    <p className="text-sm text-gray-600">{article.description}</p>
                  <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-400">
                    <span>📅 {article.date}</span>
                    <span>🔥 {article.views} views</span>
                   <span>💬 {article.comments} comments</span>
                  </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar with Staff Picks */}
        <div className="bg-base-200 p-4 rounded-lg shadow-md col-span-1 lg:ml-8 mt-6 lg:mt-0">
          <h3 className="text-lg font-bold text-primary mb-4">📌 Staff Picks</h3>
          <ul className="space-y-4">
            {staffPicks.map((pick, index) => (
              <li key={index} className="border-b border-base-300 pb-2">
                <p className="font-semibold">{pick.name}</p>
                <p className="text-sm text-gray-600">{pick.title}</p>
                <p className="text-xs text-gray-400">{pick.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
