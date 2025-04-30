import React, { useState } from "react";
import {
  BellIcon,
  PencilIcon,
  PaperAirplaneIcon,
  UserIcon,
} from "@heroicons/react/24/outline"; //  User icon

const NavBar = () => {
  const [showModal, setShowModal] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");

  const handlePublish = () => {
    console.log("Title:", blogTitle);
    console.log("Content:", blogContent);
    setShowModal(false);
    setBlogTitle("");
    setBlogContent("");
  };

  return (
    <>
      <div className="navbar bg-base-200 px-4 shadow-md flex items-center justify-between">
        {/* Logo */}
        <div className="flex-none">
          <a className="btn btn-ghost text-xl text-black">BlogPost</a>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search articles..."
            className="input input-bordered input-lg rounded-full w-full md:w-96"
          />
        </div>

        
        <div className="flex-none flex items-center gap-4">
          {/* Write Icon */}
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setShowModal(true)}
            title="Write Blog"
          >
            <PencilIcon className="w-6 h-6 text-primary" />
          </button>
          <span className="text-primary font-semibold hidden sm:inline">
            Write
          </span>

          {/* Notification */}
          <button className="btn btn-ghost btn-circle" title="Notifications">
            <BellIcon className="w-6 h-6" />
          </button>

          {/* Profile Dropdown with Profile Icon */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300">
                <UserIcon className="pl-2 w-6 h-6 text-gray-700 mt-1" /> {/* Profile Icon */}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li><a>My Profile</a></li>
              <li><a>Settings</a></li>
              <li><a className="text-red-500">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal for Blog Writing */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl">
            <h2 className="text-xl font-bold text-primary mb-4">
              Write Your Blog
            </h2>

            <input
              type="text"
              placeholder="Enter Blog Title"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              className="input input-bordered w-full mb-4"
            />

            <textarea
              placeholder="Write your blog content here..."
              rows="8"
              value={blogContent}
              onChange={(e) => setBlogContent(e.target.value)}
              className="textarea textarea-bordered w-full mb-6"
            />

            <div className="flex justify-end gap-4">
              <button className="btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button
                className="btn bg-green-500 hover:bg-green-600 text-white"
                onClick={handlePublish}
              >
                <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
