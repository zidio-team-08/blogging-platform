import React, { useState, useEffect } from 'react'
import AdminSidebar from '../../components/admin-components/AdminSidebar'
import { FiUsers, FiFileText, FiUserCheck, FiUserX, FiEdit, FiTrash2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import AdminHeader from '../../components/admin-components/AdminHeader'
import { MdBlock } from 'react-icons/md'
import Confirm from '../../components/modal/Confirm'

const AdminDashboard = () => {
   const [stats, setStats] = useState({
      totalUsers: 0,
      activeUsers: 0,
      blockedUsers: 0,
      totalBlogs: 0
   })

   const [recentUsers, setRecentUsers] = useState([
      { id: 1, name: 'John Doe', email: 'john@example.com', joinedAt: '2023-05-15', status: 'active', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinedAt: '2023-05-14', status: 'active', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
      { id: 3, name: 'Robert Johnson', email: 'robert@example.com', joinedAt: '2023-05-13', status: 'inactive', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
      { id: 4, name: 'Emily Davis', email: 'emily@example.com', joinedAt: '2023-05-12', status: 'inactive', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
      { id: 5, name: 'Michael Wilson', email: 'michael@example.com', joinedAt: '2023-05-11', status: 'active', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' }
   ])
   const [loading, setLoading] = useState(false);
   const [showModel, setShowModel] = useState(false);

   useEffect(() => {
      // Mock data - replace with actual API calls
      // setTimeout(() => {
      //     setStats({
      //         totalUsers: 1250,
      //         activeUsers: 1180,
      //         blockedUsers: 70,
      //         totalBlogs: 3456
      //     })

      //     setRecentUsers([
      //         { id: 1, name: 'John Doe', email: 'john@example.com', joinedAt: '2023-05-15', status: 'active', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      //         { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinedAt: '2023-05-14', status: 'active', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
      //         { id: 3, name: 'Robert Johnson', email: 'robert@example.com', joinedAt: '2023-05-13', status: 'inactive', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
      //         { id: 4, name: 'Emily Davis', email: 'emily@example.com', joinedAt: '2023-05-12', status: 'inactive', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
      //         { id: 5, name: 'Michael Wilson', email: 'michael@example.com', joinedAt: '2023-05-11', status: 'active', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' }
      //     ])

      //     setLoading(false)
      // }, 1000)
   }, [])


   const blockUserhandler = () => {
      setShowModel(false)
   }

   const StatCard = ({ title, value, icon, color }) => (
      <div className="bg-base-100 rounded-md border border-base-300 px-3 sm:px-4 py-4 sm:py-6 flex items-center">
         <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${color}`}>
            {icon}
         </div>
         <div className="sm:ml-6 ml-5">
            <p className="text-lg sm:text-2xl font-bold">{value.toLocaleString()}</p>
            <h3 className="text-gray-500 capitalize sm:text-sm font-medium">{title}</h3>
         </div>
      </div>
   )
   return (
      <div className="w-full h-full">
         <div className="flex flex-col md:flex-row">
            <div className="flex-1 xl:ml-64 p-3 sm:p-4 md:p-6 overflow-auto">
               <div className="mb-4 sm:mb-6">
                  <h1 className="text-xl sm:text-md capitalize font-bold text-base-content">Dashboard</h1>
                  <p className="text-base-content/80 text-sm mt-1 font-semibold">Manage all users in the system</p>
               </div>
               {loading ? (
                  <div className="flex justify-center items-center h-64">
                     <div className="loading loading-spinner loading-lg"></div>
                  </div>
               ) : (
                  <>
                     {/* Stats Cards */}
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-8 max-md:space-2">
                        <StatCard
                           className='shadow-none'
                           title="Total Users"
                           value={stats.totalUsers}
                           icon={<FiUsers className="text-white text-lg sm:text-xl" />}
                           color="bg-blue-500"
                        />
                        <StatCard
                           title="Active Users"
                           value={stats.activeUsers}
                           icon={<FiUserCheck className="text-white text-lg sm:text-xl" />}
                           color="bg-green-500"
                        />
                        <StatCard
                           title="Blocked Users"
                           value={stats.blockedUsers}
                           icon={<FiUserX className="text-white text-lg sm:text-xl" />}
                           color="bg-red-500"
                        />
                        <StatCard
                           title="Total Blogs"
                           value={stats.totalBlogs}
                           icon={<FiFileText className="text-white text-lg sm:text-xl" />}
                           color="bg-purple-500"
                        />
                     </div>

                     {/* Recent Users */}
                     <div className="bg-base-100 rounded-lg shadow-md overflow-hidden">
                        <div className="p-3 sm:p-4 border-b border-base-300">
                           <h2 className="text-base sm:text-lg font-semibold text-base-content">Recently Joined Users</h2>
                        </div>
                        <div className="overflow-x-auto">
                           <table className="min-w-full divide-y divide-base-300">
                              <thead className="bg-base-200">
                                 <tr>
                                    <th className="px-3 sm:px-6 py-3 sm:py-3 text-left text-xs font-semibold text-base-content capitalize tracking-wider">User</th>
                                    <th className="px-3 sm:px-6 py-3 sm:py-3 text-left text-xs font-semibold text-base-content capitalize tracking-wider">Email</th>
                                    <th className="px-3 sm:px-6 py-3 sm:py-3 text-left text-xs font-semibold text-base-content capitalize tracking-wider">Joined</th>
                                    <th className="px-3 sm:px-6 py-3 sm:py-3 text-left text-xs font-semibold text-base-content capitalize tracking-wider">Status</th>
                                    <th className="px-3 sm:px-6 py-3 sm:py-3 text-left text-xs font-semibold text-base-content capitalize tracking-wider">Actions</th>
                                 </tr>
                              </thead>
                              <tbody className="bg-base-100 divide-y divide-base-300">
                                 {recentUsers.map(user => (
                                    <tr key={user.id}>
                                       <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                                          <div className="flex items-center">
                                             <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                                                <img className="h-8 w-8 sm:h-10 sm:w-10 rounded-full" src={user.avatar} alt={user.name} />
                                             </div>
                                             <div className="ml-2 sm:ml-4">
                                                <div className="text-xs sm:text-sm font-medium text-base-content">{user.name}</div>
                                             </div>
                                          </div>
                                       </td>
                                       <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                                          <div className="text-xs sm:text-sm text-base-content">{user.email}</div>
                                       </td>
                                       <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                                          <div className="text-xs sm:text-sm text-base-content">{new Date(user.joinedAt).toLocaleDateString()}</div>
                                       </td>
                                       <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                                          <div className={`text-xs sm:text-sm ${user.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>{user.status}</div>
                                       </td>
                                       <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                                          <div className="flex space-x-2">
                                             <div className='tooltip' data-tip="Edit User">
                                                <button className="text-blue-600 cursor-pointer hover:bg-base-300 p-2 rounded-sm">
                                                   <FiEdit size={16} />
                                                </button>
                                             </div>
                                             <div className="tooltip" data-tip="Block User">
                                                <button onClick={() => setShowModel(true)} type='button' data-tooltip-id='block-user-tooltip' className="text-red-600 cursor-pointer hover:bg-base-300 p-2 rounded-sm">
                                                   <MdBlock size={16} />
                                                </button>
                                             </div>
                                          </div>
                                       </td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                        <div className="bg-base-200 px-3 sm:px-4 py-2 sm:py-3 border-t border-base-300 text-right">
                           <Link to="/admin/users" className="text-primary hover:text-primary-focus text-xs sm:text-sm font-medium">
                              View all users →
                           </Link>
                        </div>
                     </div>
                  </>
               )}
            </div>
         </div>
         <Confirm
            showModel={showModel}
            setShowModel={setShowModel}
            title="Confirmation Required"
            message="Are you sure you want to block this user?"
            className='text-white hover:bg-red-600 bg-red-500'
            onConfirm={blockUserhandler} />
      </div>
   )
}

export default AdminDashboard
