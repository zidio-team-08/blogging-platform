import React from 'react'
import Header from './components/Header';

const ProtectedRoutes = ({ children }) => {
    return (
        <main className='bg-base-100'>
            <Header />
            {children}
        </main>
    )
}

export default ProtectedRoutes;
