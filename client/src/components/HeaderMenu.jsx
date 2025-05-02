import React, { useCallback, useEffect, useRef } from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import { FaRegUserCircle } from 'react-icons/fa'
import { FiUser } from 'react-icons/fi'
import { MdModeEdit } from 'react-icons/md'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

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
            <div className='w-60 absolute right-0 top-12 shadow-xl border border-base-300 rounded-md bg-white z-50' ref={menuRef}>
                <div className="border-b border-base-300">
                    <div className="flex items-center gap-5 p-4">
                        <div className="bg-gray-200 p-2 rounded-full">
                            <FiUser size={25} />
                        </div>
                        <div>
                            <p className="font-bold text-sm">@username</p>
                            <p className="text-sm text-gray-700">email@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div className="w-full" onClick={() => setShowMenu(false)}>
                    <Link to='/new-story' className="flex items-center border-b-2 border-base-300 px-4 py-3 gap-3 hover:bg-base-300">
                        <MdModeEdit size={20} />
                        <p className="text-md font-semibold">New Story</p>
                    </Link>


                    <Link to='/profile' className="flex items-center border-b-2 border-base-300 px-4 py-3 gap-3 hover:bg-base-300">
                        <FaRegUserCircle size={20} />
                        <p className="text-md font-semibold">Profile</p>
                    </Link>

                    <button
                        type='button'
                        onClick={menuBtnClick}
                        className="w-full cursor-pointer flex items-center text-red-500 px-4 py-3 gap-3 hover:bg-red-50">
                        <RiLogoutCircleRLine size={20} />
                        <p className="text-md font-semibold">Logout</p>
                    </button>
                </div>
            </div>
        </>
    )
}

export default HeaderMenu
