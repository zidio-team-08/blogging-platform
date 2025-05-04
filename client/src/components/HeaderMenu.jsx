import React, { useCallback, useEffect, useRef } from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import { FaRegUserCircle, FaRegWindowRestore } from 'react-icons/fa'
import { FiUser } from 'react-icons/fi'
import { MdModeEdit } from 'react-icons/md'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { LuBookmarkCheck } from 'react-icons/lu'

const HeaderMenu = ({ showMenu, setShowMenu, showMenuBtnRef, modalRef }) => {

    const menuRef = useRef(null);

    // handle outside click hide menu
    const handleOutSideClick = useCallback((e) => {
        if (menuRef.current &&
            !showMenuBtnRef.current.contains(e.target) &&
            !menuRef.current.contains(e.target)) {
            setShowMenu(false);
        }
    }, [showMenu]);

    useEffect(() => {
        window.addEventListener('mousedown', handleOutSideClick);
        return () => {
            window.removeEventListener('mousedown', handleOutSideClick);
        }
    }, []);

    const menuBtnClick = useCallback(() => {
        modalRef.current.showModal()
        // setShowMenu(false);
    }, [showMenu]);

    return (
        <>
            <div className='w-60 absolute right-0 top-12 shadow-xl border border-base-300 rounded-md bg-base-100 z-50' ref={menuRef}>
                <div className="border-b border-base-300">
                    <div className="flex items-center gap-5 p-4">
                        <div className="bg-base-200 p-2 rounded-full">
                            <FiUser size={25} />
                        </div>
                        <div>
                            <p className="font-medium text-sm">@username</p>
                            <p className="text-sm text-base-500">email@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div className="w-full" onClick={() => setShowMenu(false)}>
                    <Link to='/new-story' className="flex items-center border-b border-base-300 px-4 py-3 gap-3 hover:bg-base-300">
                        <MdModeEdit size={18} />
                        <p className="text-sm font-medium">New Story</p>
                    </Link>


                    <Link to='/profile' className="flex items-center border-b border-base-300 px-4 py-3 gap-3 hover:bg-base-300">
                        <FaRegUserCircle size={18} />
                        <p className="text-sm font-medium">Profile</p>
                    </Link>

                    <Link to='/my-stories' className="flex items-center border-b border-base-300 px-4 py-3 gap-3 hover:bg-base-300">
                        <FaRegWindowRestore size={18} />
                        <p className="text-sm font-medium">My Stories</p>
                    </Link>

                    <Link to='/saved' className="flex items-center border-b border-base-300 px-4 py-3 gap-3 hover:bg-base-300">
                        <LuBookmarkCheck size={18} />
                        <p className="text-sm font-medium">Saved</p>
                    </Link>

                    <button
                        type='button'
                        onClick={menuBtnClick}
                        className="w-full cursor-pointer flex items-center text-error px-4 py-3 gap-3  hover:bg-base-300">
                        <RiLogoutCircleRLine size={18} />
                        <p className="text-sm font-medium">Logout</p>
                    </button>
                </div>
            </div>
        </>
    )
}

export default HeaderMenu
