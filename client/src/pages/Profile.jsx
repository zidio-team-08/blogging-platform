import React, { useState } from 'react'
import { FiEdit, FiUser, FiLock } from 'react-icons/fi'
import Header from '../components/Header'
import { MdOutlineEmail } from 'react-icons/md'
import { FaAt, FaFacebook, FaGithub, FaLink, FaTwitter, FaYoutube, FaEye, FaEyeSlash } from 'react-icons/fa'
import { GrInstagram } from "react-icons/gr";
import toast from 'react-hot-toast';

const Profile = () => {
    const [bio, setBio] = useState("This is a test profile.")
    const [imagePreview, setImagePreview] = useState("https://randomuser.me/api/portraits/men/1.jpg")
    const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false)
    const [newPasswordVisible, setNewPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
    const [activeTab, setActiveTab] = useState("profile")

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 1024 * 1024 * 2) { // 2MB limit
                toast.error('Image size should be less than 2MB');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <div className="max-w-4xl mx-auto px-4 py-8 min-h-[100vh]">
                <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Profile Image Section */}
                    <div className="flex flex-col items-center">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-3">
                            <img
                                src={imagePreview}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                                <label htmlFor="profileImage" className="cursor-pointer w-full h-full flex items-center justify-center">
                                    <FiEdit className="text-white text-xl" />
                                </label>
                            </div>
                        </div>
                        <input
                            type="file"
                            id="profileImage"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="profileImage" className="btn btn-sm btn-outline rounded-full px-4 mb-6">Upload</label>
                        {/* ${activeTab === "profile" ? "bg-primary text-white" : "hover:bg-base-200 */}
                        {/* Sidebar Navigation */}
                        <div className="w-full space-y-2 mt-3">
                            <button
                                onClick={() => setActiveTab("profile")}
                                className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-2  cursor-pointer bg-base-200 ${activeTab == "profile" && "bg-base-300"}`}
                            >
                                <FiUser size={18} />
                                <span className="font-medium text-sm">Profile</span>
                            </button>
                            <button
                                onClick={() => setActiveTab("password")}
                                className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer bg-base-200 ${activeTab == "password" && "bg-base-300"}`}
                            >
                                <FiLock size={18} />
                                <span className="font-medium text-sm">Change Password</span>
                            </button>
                        </div>
                    </div>

                    {/* Profile Form */}
                    <div className="flex-1">
                        <div className="space-y-4">
                            {activeTab === "profile" && (
                                <>
                                    <div className='flex items-center gap-5'>
                                        <div className='w-full border-transparent input h-[45px] font-semibold bg-base-200 focus-within:outline-none focus-within:border-primary'>
                                            <span className="px-1 text-[#808080]"><FiUser size={20} /></span>
                                            <input
                                                type="text"
                                                className="w-full font-semibold text-md"
                                                placeholder="Your name"
                                                defaultValue="John Doe" />
                                        </div>

                                        <div className='w-full border-transparent input h-[45px] font-semibold bg-base-200 focus-within:outline-none focus-within:border-primary'>
                                            <span className="px-1 text-[#808080]"><MdOutlineEmail size={20} /></span>
                                            <input
                                                type="email"
                                                className="w-full font-semibold text-md"
                                                placeholder="your@email.com"
                                                defaultValue="john@example.com" />
                                        </div>
                                    </div>

                                    <div className='w-full border-transparent input h-[45px] font-semibold bg-base-200 focus-within:outline-none focus-within:border-primary'>
                                        <span className="px-1 text-[#808080]"><FaAt size={20} /></span>
                                        <input
                                            type="text"
                                            className="w-full font-semibold text-md"
                                            placeholder="username"
                                            defaultValue="johndoe123" />
                                    </div>


                                    <textarea
                                        className="w-full border-transparent textarea font-semibold bg-base-200 focus-within:outline-none focus-within:border-primary py-2 px-4"
                                        placeholder="Tell us about yourself"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                    ></textarea>
                                    <p className="text-sm text-gray-600 font-medium mt-1">{250 - bio.length} characters left</p>

                                    <div className='flex flex-col md:flex-row items-center gap-5'>
                                        <div className='w-full border-transparent input h-[45px] font-semibold bg-base-200 focus-within:outline-none focus-within:border-primary'>
                                            <span className="px-1 text-[#808080]"><FaYoutube size={20} /></span>
                                            <input
                                                type="url"
                                                className="w-full font-semibold text-md"
                                                placeholder="Youtube Channel"
                                                defaultValue="https://" />
                                        </div>

                                        <div className='w-full border-transparent input h-[45px] font-semibold bg-base-200 focus-within:outline-none focus-within:border-primary'>
                                            <span className="px-1 text-[#808080]"><GrInstagram size={20} /></span>
                                            <input
                                                type="url"
                                                className="w-full font-semibold text-md"
                                                placeholder="Instagram"
                                                defaultValue="https://" />
                                        </div>
                                    </div>


                                    <div className='flex flex-col md:flex-row items-center gap-5'>
                                        <div className='w-full border-transparent input h-[45px] font-semibold bg-base-200 focus-within:outline-none focus-within:border-primary'>
                                            <span className="px-1 text-[#808080]"><FaFacebook size={20} /></span>
                                            <input
                                                type="url"
                                                className="w-full font-semibold text-md"
                                                placeholder="Facebook"
                                                defaultValue="https://" />
                                        </div>

                                        <div className='w-full border-transparent input h-[45px] font-semibold bg-base-200 focus-within:outline-none focus-within:border-primary'>
                                            <span className="px-1 text-[#808080]"><FaTwitter size={20} /></span>
                                            <input
                                                type="url"
                                                className="w-full font-semibold text-md"
                                                placeholder="Twitter"
                                                defaultValue="https://" />
                                        </div>
                                    </div>



                                    <div className='flex flex-col md:flex-row items-center gap-5'>
                                        <div className='w-full border-transparent input h-[45px] font-semibold bg-base-200 focus-within:outline-none focus-within:border-primary'>
                                            <span className="px-1 text-[#808080]"><FaGithub size={20} /></span>
                                            <input
                                                type="url"
                                                className="w-full font-semibold text-md"
                                                placeholder="Github"
                                                defaultValue="https://" />
                                        </div>

                                        <div className='w-full border-transparent input h-[45px] font-semibold bg-base-200 focus-within:outline-none focus-within:border-primary'>
                                            <span className="px-1 text-[#808080]"><FaLink size={20} /></span>
                                            <input
                                                type="url"
                                                className="w-full font-semibold text-md"
                                                placeholder="Link"
                                                defaultValue="https://" />
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button className="btn btn-primary px-6 h-[45px] max-sm:w-full">Save Changes</button>
                                    </div>
                                </>
                            )}

                            {activeTab === "password" && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-bold mb-4">Change Password</h2>
                                    <div className='w-full border-transparent input h-[45px] font-semibold bg-base-200 focus-within:outline-none focus-within:border-primary relative'>
                                        <span className="px-1 text-[#808080]"><FiLock size={20} /></span>
                                        <input
                                            type={currentPasswordVisible ? 'text' : 'password'}
                                            className="w-full font-semibold text-md"
                                            placeholder="Current Password"
                                        />
                                        {
                                            currentPasswordVisible ?
                                                <span onClick={() => setCurrentPasswordVisible(false)} className='cursor-pointer absolute right-3 p-2 rounded-full hover:bg-gray-100'>
                                                    <FaEye size={16} />
                                                </span> :
                                                <span onClick={() => setCurrentPasswordVisible(true)} className='cursor-pointer absolute right-3 p-2 rounded-full hover:bg-gray-100'>
                                                    <FaEyeSlash size={16} />
                                                </span>
                                        }
                                    </div>

                                    <div className='w-full border-transparent input h-[45px] font-semibold bg-base-200 focus-within:outline-none focus-within:border-primary relative'>
                                        <span className="px-1 text-[#808080]"><FiLock size={20} /></span>
                                        <input
                                            type={newPasswordVisible ? 'text' : 'password'}
                                            className="w-full font-semibold text-md"
                                            placeholder="New Password"
                                        />
                                        {
                                            newPasswordVisible ?
                                                <span onClick={() => setNewPasswordVisible(false)} className='cursor-pointer absolute right-3 p-2 rounded-full hover:bg-gray-100'>
                                                    <FaEye size={16} />
                                                </span> :
                                                <span onClick={() => setNewPasswordVisible(true)} className='cursor-pointer absolute right-3 p-2 rounded-full hover:bg-gray-100'>
                                                    <FaEyeSlash size={16} />
                                                </span>
                                        }
                                    </div>

                                    <div className='w-full border-transparent input h-[45px] font-semibold bg-base-200 focus-within:outline-none focus-within:border-primary relative'>
                                        <span className="px-1 text-[#808080]"><FiLock size={20} /></span>
                                        <input
                                            type={confirmPasswordVisible ? 'text' : 'password'}
                                            className="w-full font-semibold text-md"
                                            placeholder="Confirm New Password"
                                        />
                                        {
                                            confirmPasswordVisible ?
                                                <span onClick={() => setConfirmPasswordVisible(false)} className='cursor-pointer absolute right-3 p-2 rounded-full hover:bg-gray-100'>
                                                    <FaEye size={16} />
                                                </span> :
                                                <span onClick={() => setConfirmPasswordVisible(true)} className='cursor-pointer absolute right-3 p-2 rounded-full hover:bg-gray-100'>
                                                    <FaEyeSlash size={16} />
                                                </span>
                                        }
                                    </div>

                                    <button className="btn btn-primary px-6 h-[45px] max-sm:w-full mt-4">Update Password</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
