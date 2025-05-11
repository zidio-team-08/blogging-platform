import React, { Suspense } from 'react';
import AdminHeader from './components/admin-components/AdminHeader';
import AdminSidebar from './components/admin-components/AdminSidebar';
import Loader from './components/Loader';

const AdminRoutes = ({ children }) => {
    return (
        <Suspense fallback={
            <div className='w-full h-screen bg-base-100 flex items-center justify-center'>
                <Loader />
            </div>
        }>
            <main className='bg-base-100'>
                <AdminHeader />
                <AdminSidebar />
                {children}
            </main>
        </Suspense>
    )
}

export default AdminRoutes;
