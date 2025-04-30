import React from "react";
import { BellIcon, PencilIcon } from "@heroicons/react/24/outline";

const NavBar= () => {
  return (
    <div className="navbar bg-base-200 px-4 shadow-md flex items-center">
      {/* BlogPost Button */}
      <div className="flex-none">
        <a className="btn btn-ghost text-xl text-black">BlogPost</a>
      </div>

      {/* Centered Round Search Bar */}
      <div className="flex-1 ml-4">
        <div className="form-control w-auto">
          <input
            type="text"
            placeholder="Search articles..."
            className="input input-bordered input-lg rounded-full w-full md:w-96"
          />
        </div>
      </div>

      {/* Pencil Icon for Creating Blog */}
      <div className="flex-none ml-4 flex items-center gap-2">
        <button className="btn btn-ghost btn-circle">
          <PencilIcon className="w-6 h-6 text-primary" />
        </button>
        <span className="text-primary font-semibold">Write</span>
      </div>

      {/* Notification Icon */}
      <div className="flex-none gap-4 ml-4">
        <button className="btn btn-ghost btn-circle">
          <BellIcon className="w-6 h-6" />
        </button>
        <div className="avatar">
          <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="https://i.pravatar.cc/150?img=32" alt="profile" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
