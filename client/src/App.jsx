import React, { lazy, Suspense } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Loader from './components/Loader';
const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Blog = lazy(() => import("./pages/Blog"));
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NewStory from './pages/NewStory';
import ProtectedRoutes from './ProtectedRoutes';

const App = () => {

    // React Query
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={
                <div className='w-full h-screen flex items-center justify-center'>
                    <Loader />
                </div>
            }>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />

                    <Route path='/blog/:id' element={<Blog />} />
                    <Route path='/new-story' element={
                        <ProtectedRoutes>
                            <NewStory />
                        </ProtectedRoutes>
                    } />

                </Routes>
            </Suspense>
        </QueryClientProvider>
    )
}

export default App
