import React from 'react'
import Header from './components/Header';

const ProtectedRoutes = ({ children }) => {
    return (
        <main>
            <Header />
            {children}
        </main>
    )
}

export default ProtectedRoutes;
