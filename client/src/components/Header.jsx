import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiEdit, FiSearch, FiUser } from 'react-icons/fi';
import HeaderMenu from './HeaderMenu';
import Logout from './modal/Logout';

const Header = () => {

    const location = useLocation();
    // header menu show and hide
    const [showMenu, setShowMenu] = useState(false);
    const showMenuBtnRef = useRef(null);
    const modalRef = useRef(null);

    return (
        <>
            <div className="w-full h-14 bg-base-100 border border-base-300 flex items-center justify-between px-6 relative max-[810px]:px-4">
                <Link to='/'>
                    <h1 className='text-xl font-semibold capitalize'>Postilo</h1>
                </Link>
                {/* center search */}

                {
                    location.pathname == '/' && (
                        <div className='w-full input max-w-96 focus-within:shadow-none focus-within:outline-none focus-within:border-primary mx-auto absolute left-1/2 -translate-x-1/2 max-[810px]:hidden rounded-3xl'>
                            <input
                                type="text"
                                placeholder="Search"
                                className=" font-semibold pl-3" />
                            <span><FiSearch className='cursor-pointer' size={18} /></span>
                        </div>
                    )
                }

                <div className='flex items-center gap-2'>
                    <div className='max-[810px]:block hidden'><FiSearch size={25} /></div>
                    <Link to='/new-story' className='flex items-center justify-center gap-2 max-[810px]:hidden'>
                        <FiEdit size={20} />
                        <span className='font-semibold max-[810px]:hidden'>Write</span>
                    </Link>

                    <div className='relative'>
                        <button ref={showMenuBtnRef} onClick={() => setShowMenu(!showMenu)} role="button" className='btn btn-ghost btn-circle'>
                            <FiUser size={20} />
                        </button>

                        {showMenu && <HeaderMenu modalRef={modalRef} showMenu={showMenu} setShowMenu={setShowMenu} showMenuBtnRef={showMenuBtnRef} />}
                    </div>
                </div>
            </div>
            {/* Logout modal */}
            <Logout modalRef={modalRef} />
        </>

    )
}

export default Header
