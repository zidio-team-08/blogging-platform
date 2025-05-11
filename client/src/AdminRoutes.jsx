import React, { Suspense } from 'react';
import AdminHeader from './components/admin-components/AdminHeader';
import Loader from './components/Loader';

const AdminRoutes = ({ children }) => {
    return (
        <>
            <AdminHeader />
            <Suspense fallback={
                <div className='w-full h-screen bg-base-100 flex items-center justify-center'>
                    <Loader />
                </div>}>
                <main className='bg-base-100'>
                    {children}
                </main>
            </Suspense>
        </>
    )
}

export default AdminRoutes;
