import { Outlet } from 'react-router-dom';
import AdminHeader from './components/admin-components/AdminHeader';
import AdminSidebar from './components/admin-components/AdminSidebar';

const AdminLayout = () => {
    return (
        <main className='bg-base-100'>
            <AdminHeader />
            <AdminSidebar />
            <Outlet />
        </main>
    );
};

export default AdminLayout;