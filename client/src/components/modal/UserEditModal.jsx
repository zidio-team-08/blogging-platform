import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiUser, FiLock } from 'react-icons/fi'
import { MdOutlineEmail } from 'react-icons/md'
import { FaAt, FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa'
import { GrInstagram } from 'react-icons/gr'

const UserEditModal = ({ showEditModel, setShowEditModel, selectedUser, setSelectedUser }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        setShowEditModel(false);
        setSelectedUser("");
    };

    return (
        <dialog id="user_edit_modal" className="modal modal-bottom sm:modal-middle" open={showEditModel}>
            <div className="modal-box max-w-3xl">
                <h3 className="font-bold text-md mb-8">Edit Profile</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-1 space-y-4">
                            <div className='flex flex-col sm:flex-row gap-4'>
                                <div className='w-full border-transparent input h-[45px] font-semibold bg-base-200 focus-within:outline-none focus-within:border-primary'>
                                    <span className="text-[#808080]"><FiUser ize={18} /></span>
                                    <input
                                        type="text"
                                        className="w-full font-medium text-xs"
                                        placeholder="Your name"
                                        {...register('name')}
                                        defaultValue={selectedUser?.name || ""}
                                    />
                                </div>

                                <div className='w-full border-transparent input h-[45px] font-semibold bg-base-200 focus-within:outline-none focus-within:border-primary'>
                                    <span className="text-[#808080]"><FaAt ize={18} /></span>
                                    <input
                                        type="text"
                                        className="w-full font-medium text-xs"
                                        placeholder="username"
                                        {...register('username')}
                                        defaultValue={selectedUser?.username || ""}
                                    />
                                </div>
                            </div>

                            <div className='w-full border-transparent input h-[45px] font-semibold bg-base-200 focus-within:outline-none focus-within:border-primary'>
                                <span className="text-[#808080]"><MdOutlineEmail ize={18} /></span>
                                <input
                                    type="email"
                                    className="w-full font-medium text-xs"
                                    placeholder="Enter Email Address"
                                    {...register('email')}
                                    defaultValue={selectedUser?.email || ""}
                                />
                            </div>

                            <textarea
                                className="w-full border-transparent textarea font-semibold bg-base-200 focus-within:outline-none resize-none focus-within:border-primary py-2 px-4"
                                placeholder="Tell us about yourself"
                                {...register('bio')}
                                maxLength={250}
                                rows={3}
                                defaultValue={selectedUser?.bio || ""}
                            ></textarea>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="pt-2">
                        <h4 className="font-semibold mb-2">Social Links</h4>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div className='w-full border-transparent input h-[45px] font-semibold bg-base-200 focus-within:outline-none focus-within:border-primary'>
                                <span className="text-[#808080]"><FaYoutube size={18} /></span>
                                <input
                                    type="text"
                                    className="w-full font-medium text-xs"
                                    placeholder="Youtube Channel"
                                    {...register('socialLinks.youtube')}
                                    defaultValue={selectedUser?.socialLinks?.youtube || ""}
                                />
                            </div>
                            <div className='w-full border-transparent input h-[45px] font-semibold bg-base-200 focus-within:outline-none focus-within:border-primary'>
                                <span className="text-[#808080]"><GrInstagram size={18} /></span>
                                <input
                                    type="text"
                                    className="w-full font-medium text-xs"
                                    placeholder="Instagram"
                                    {...register('socialLinks.instagram')}
                                    defaultValue={selectedUser?.socialLinks?.instagram || ""}
                                />
                            </div>
                            <div className='w-full border-transparent input h-[45px] font-semibold bg-base-200 focus-within:outline-none focus-within:border-primary'>
                                <span className="text-[#808080]"><FaFacebook size={18} /></span>
                                <input
                                    type="text"
                                    className="w-full font-medium text-xs"
                                    placeholder="Facebook"
                                    {...register('socialLinks.facebook')}
                                    defaultValue={selectedUser?.socialLinks?.facebook || ""}
                                />
                            </div>
                            <div className='w-full border-transparent input h-[45px] font-semibold bg-base-200 focus-within:outline-none focus-within:border-primary'>
                                <span className="text-[#808080]"><FaTwitter size={18} /></span>
                                <input
                                    type="text"
                                    className="w-full font-medium text-xs"
                                    placeholder="Twitter"
                                    {...register('socialLinks.twitter')}
                                    defaultValue={selectedUser?.socialLinks?.twitter || ""}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={() => {
                            setShowEditModel(false);
                            setSelectedUser("");
                        }}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}

export default UserEditModal
