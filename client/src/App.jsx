import React, { lazy, Suspense } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Loader from './components/Loader';
const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));

const App = () => {
    return (
        <Suspense fallback={<div className='w-full h-screen flex items-center justify-center'><Loader /></div>}>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </Suspense>
    )
}

export default App
