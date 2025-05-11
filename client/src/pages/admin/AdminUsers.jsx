
import React, { useState, useEffect } from 'react'
import AdminSidebar from '../../components/admin-components/AdminSidebar'
import AdminHeader from '../../components/admin-components/AdminHeader'
import { FiSearch, FiEdit, FiTrash2 } from 'react-icons/fi';


const allusers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', joinedAt: '2023-05-15', status: 'active', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinedAt: '2023-05-14', status: 'active', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', joinedAt: '2023-05-13', status: 'inactive', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', joinedAt: '2023-05-12', status: 'inactive', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { id: 5, name: 'Michael Wilson', email: 'michael@example.com', joinedAt: '2023-05-11', status: 'active', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
  { id: 6, name: 'Sarah Brown', email: 'sarah@example.com', joinedAt: '2023-05-10', status: 'active', avatar: 'https://randomuser.me/api/portraits/women/6.jpg' },
  { id: 7, name: 'David Miller', email: 'david@example.com', joinedAt: '2023-05-09', status: 'blocked', avatar: 'https://randomuser.me/api/portraits/men/7.jpg' },
  { id: 8, name: 'Lisa Taylor', email: 'lisa@example.com', joinedAt: '2023-05-08', status: 'active', avatar: 'https://randomuser.me/api/portraits/women/8.jpg' },
  { id: 9, name: 'James Anderson', email: 'james@example.com', joinedAt: '2023-05-07', status: 'active', avatar: 'https://randomuser.me/api/portraits/men/9.jpg' },
  { id: 10, name: 'Jennifer White', email: 'jennifer@example.com', joinedAt: '2023-05-06', status: 'inactive', avatar: 'https://randomuser.me/api/portraits/women/10.jpg' },
  { id: 11, name: 'Thomas Harris', email: 'thomas@example.com', joinedAt: '2023-05-05', status: 'active', avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
  { id: 12, name: 'Jessica Martin', email: 'jessica@example.com', joinedAt: '2023-05-04', status: 'blocked', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
]

const AdminUsers = () => {
  const [users, setUsers] = useState(allusers)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const usersPerPage = 10

  // useEffect(() => {
  //   // Mock data - replace with actual API calls
  //   setTimeout(() => {
  //     const mockUsers =
  //     setUsers(mockUsers)
  //     setTotalPages(Math.ceil(mockUsers.length / usersPerPage))
  //     setLoading(false)
  //   }, 1000)
  // }, [])

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

  // Get user initials for avatar fallback
  const getUserInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="w-full h-full bg-base-100">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 xl:ml-64 p-3 sm:p-4 md:p-6 overflow-auto">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-xl uppercase font-bold text-base-content">Users Management</h1>
            <p className="text-gray-600 text-sm mt-1">Manage all users in the system</p>
          </div>

          {/* Search and Filter */}
          <div className="mb-4 sm:mb-6">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search users by name or email..."
                className="input input-bordered w-full pr-10"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1) // Reset to first page on search
                }}
              />
              <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="loading loading-spinner loading-lg"></div>
            </div>
          ) : (
            <>
              {/* Users Table */}
              <div className="bg-base-100 rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-base-300">
                    <thead className="bg-base-200">
                      <tr>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-semibold text-base-content uppercase tracking-wider">User</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Email</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Joined</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Status</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-semibold text-base-content uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-base-100 divide-y divide-base-300">
                      {currentUsers.length > 0 ? (
                        currentUsers.map(user => (
                          <tr key={user.id}>
                            <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                                  {user.avatar ? (
                                    <img className="h-8 w-8 sm:h-10 sm:w-10 rounded-full" src={user.avatar} alt={user.name} />
                                  ) : (
                                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary text-white flex items-center justify-center">
                                      {getUserInitials(user.name)}
                                    </div>
                                  )}
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
                              <span className={`px-2 py-1 rounded-full text-xs ${user.status === 'active' ? 'bg-green-100 text-green-800' :
                                user.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                              <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-900">
                                  <FiEdit size={16} />
                                </button>
                                <button className="text-red-600 hover:text-red-900">
                                  <FiTrash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-3 sm:px-6 py-4 text-center text-sm text-gray-500">
                            No users found matching your search criteria
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              {filteredUsers.length > 0 && (
                <div className="flex justify-center mt-4 sm:mt-6">
                  <div className="join">
                    <button
                      className="join-item btn btn-sm"
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      «
                    </button>
                    {[...Array(totalPages).keys()].map(number => (
                      <button
                        key={number + 1}
                        onClick={() => paginate(number + 1)}
                        className={`join-item btn btn-sm ${currentPage === number + 1 ? 'btn-active' : ''}`}
                      >
                        {number + 1}
                      </button>
                    ))}
                    <button
                      className="join-item btn btn-sm"
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      »
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminUsers
