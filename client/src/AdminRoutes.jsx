import React, { Suspense } from 'react';
import AdminHeader from './components/admin-components/AdminHeader';
import Loader from './components/Loader';

const AdminRoutes = ({ children }) => {
    return (
        <>
            <AdminHeader />
            <Suspense fallback={
                <div className='w-full h-screen max-w-[1500px] bg-base-100 flex items-center justify-center'>
                    <Loader />
                </div>}>
                <main className='bg-base-300 max-w-[1500px] mx-auto'>
                    {children}
                </main>
            </Suspense>
        </>
    )
}

export default AdminRoutes;
