import React, { lazy, Suspense, useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loader from './components/Loader';
const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Blog = lazy(() => import("./pages/Blog"));
const NewStory = lazy(() => import("./pages/NewStory"));
import ProtectedRoutes from './ProtectedRoutes';
import AdminRoutes from './AdminRoutes';
import AdminBlogs from './pages/admin/AdminBlogs';
// import UserProfile from './pages/UserProfile';
const Profile = lazy(() => import("./pages/Profile"));
const MyStories = lazy(() => import("./pages/MyStories"));
const Saved = lazy(() => import("./pages/Saved"));
const UserProfile = lazy(() => import("./pages/UserProfile"));

// admin panel routes
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));


const App = () => {

    // React Query
    const queryClient = new QueryClient();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={
                <div className='w-full h-screen flex items-center justify-center bg-base-100'>
                    <Loader />
                </div>
            }>
                <Routes>
                    <Route path='/' element={
                        <Home />
                    } />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />

                    <Route path='/blog/:id' element={<Blog />} />
                    <Route path='/new-story' element={
                        <ProtectedRoutes>
                            <NewStory />
                        </ProtectedRoutes>
                    } />
                    <Route path='/profile' element={
                        <ProtectedRoutes>
                            <Profile />
                        </ProtectedRoutes>
                    } />

                    <Route path='/my-stories' element={
                        <ProtectedRoutes>
                            <MyStories />
                        </ProtectedRoutes>
                    } />

                    <Route path='/saved' element={
                        <ProtectedRoutes>
                            <Saved />
                        </ProtectedRoutes>
                    } />

                    <Route path='/user/:username' element={
                        <UserProfile />
                    } />

                    {/* admin panel routes */}
                    <Route path='/admin/login' element={
                        <AdminLogin />
                    } />

                    <Route path='/admin' element={
                        <AdminRoutes>
                            <AdminDashboard />
                        </AdminRoutes>
                    } />

                    <Route path='/admin/users' element={
                        <AdminRoutes>
                            <AdminUsers />
                        </AdminRoutes>
                    } />

                    <Route path='/admin/blogs' element={
                        <AdminRoutes>
                            <AdminBlogs />
                        </AdminRoutes>
                    } />
                </Routes>
            </Suspense>
        </QueryClientProvider>
    )
}

export default App
