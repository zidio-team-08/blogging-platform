import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiEdit, FiSearch, FiUser } from 'react-icons/fi';
import HeaderMenu from './HeaderMenu';
import Logout from './modal/Logout';
import ThemeToggle from './ThemeToggle';
import { useSelector } from 'react-redux';

const Header = () => {

    const location = useLocation();
    // header menu show and hide
    const [showMenu, setShowMenu] = useState(false);
    const showMenuBtnRef = useRef(null);
    const modalRef = useRef(null);
    const { user } = useSelector((state) => state.auth);

    return (
        <>
            <div className="w-full h-14 bg-base-100 border border-base-300 flex items-center justify-between px-6 relative max-[810px]:px-4">
                <Link to='/'>
                    <h1 className='text-xl font-semibold capitalize'>Postilo</h1>
                </Link>
                {
                    location.pathname == '/' && (
                        <div className='w-full input max-w-96 focus-within:shadow-none focus-within:outline-none focus-within:border-primary mx-auto absolute left-1/2 -translate-x-1/2 max-[810px]:hidden rounded-md'>
                            <input
                                type="text"
                                placeholder="Search"
                                className=" font-medium pl-3" />
                            <span><FiSearch className='cursor-pointer' size={18} /></span>
                        </div>
                    )
                }

                <div className='flex items-center gap-4'>
                    <div className='max-[810px]:block hidden cursor-pointer hover:text-primary rounded-full'><FiSearch size={22} /></div>
                    <Link to='/new-story' className='flex items-center justify-center gap-2 max-[810px]:hidden hover:bg-base-200 px-4 py-2 rounded-full'>
                        <FiEdit size={17} />
                        <span className='font-medium text-sm max-[810px]:hidden'>Write</span>
                    </Link>
                    <ThemeToggle />
                    <div className='relative'>
                        <button ref={showMenuBtnRef} onClick={() => setShowMenu(!showMenu)} role="button" className='btn btn-ghost btn-circle -mr-2'>
                            {user?.profileImage ? (
                                <img src={user?.profileImage} alt="Profile" className='w-8 h-8 rounded-full object-cover' />
                            ) : (
                                <FiUser size={20} />
                            )}
                        </button>
                        {showMenu && <HeaderMenu user={user} modalRef={modalRef} showMenu={showMenu} setShowMenu={setShowMenu} showMenuBtnRef={showMenuBtnRef} />}
                    </div>
                </div>
            </div>
            {/* Logout modal */}
            <Logout modalRef={modalRef} />
        </>

    )
}

export default Header
