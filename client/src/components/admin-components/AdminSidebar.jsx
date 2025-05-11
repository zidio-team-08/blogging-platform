import React from 'react'
import { FiLogOut, FiHome, FiUsers, FiFileText, FiUserPlus } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'

const AdminSidebar = ({ isOpen, setIsOpen }) => {

    const location = useLocation()

    // Navigation items
    const navItems = [
        { path: '/admin/', name: 'Dashboard', icon: <FiHome size={20} /> },
        { path: '/admin/users', name: 'Users', icon: <FiUsers size={20} /> },
        { path: '/admin/blogs', name: 'Blogs', icon: <FiFileText size={20} /> },
        { path: '/admin/admins', name: 'Admins', icon: <FiUserPlus size={20} /> },
    ]

    const NavItem = ({ item }) => {
        const isActive = location.pathname === item.path
        return (
            <Link
                to={item.path}
                className={`flex items-center border border-base-300 gap-3 px-4 py-3 rounded-md transition-colors ${isActive
                    ? 'bg-primary text-white'
                    : 'text-base-content hover:bg-base-200'
                    }`}
                onClick={() => setIsOpen(false)}
            >
                {item.icon}
                <span className="font-medium">{item.name}</span>
            </Link>
        )
    }


    return (
        <>
            {isOpen && (
                <div
                    className="xl:hidden fixed backdrop-blur-xs inset-0 bg-black/10 z-20" onClick={() => setIsOpen(false)}>
                </div>

            )}
            <div className={`fixed inset-y-0 left-0 top-16 z-10 max-xl:!top-0 max-xl:!z-30 w-64 bg-base-100 border-r border-base-300 transform transition-transform duration-300 ease-in-out h-screen ${isOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'}`}>
                <h1 className='w-full text-center text-xl font-bold p-4 hidden max-xl:block'>Admin Portal</h1>

                <div className="py-4 flex flex-col h-[calc(100%-64px)] mt-5">
                    <div className="flex-1 px-3 space-y-2">
                        {navItems.map((item, index) => (
                            <NavItem key={index} item={item} />
                        ))}
                    </div>

                    <div className="px-3 mt-auto pb-4">
                        <button
                            className="flex items-center cursor-pointer gap-3 px-4 py-3 w-full rounded-md border border-red-500 text-red-600 hover:text-white hover:bg-red-600 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white transition-colors"
                            onClick={() => {
                                console.log('Logging out...')
                            }}
                        >
                            <FiLogOut size={20} />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminSidebar;
