import React, { useEffect, useState } from 'react'
import Header from './components/Header';
import useAxios from './hook/useAxios';
import toast from 'react-hot-toast';
import { handleResponse } from './utils/responseHandler';
import Loader from './components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './features/authSlice';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {

    const [loading, setLoading] = useState(false);
    const { fetchData } = useAxios();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const fetchUser = async () => {
        setLoading(true);
        try {
            const response = await fetchData({
                url: '/api/user',
                method: 'GET',
            });
            const { success, message } = handleResponse(response);
            if (success) {
                dispatch(setUser({ user: response.data }));
            } else {
                if (message !== "Unauthorized access. Please login.") {
                    toast.error(message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) {
        return <div className='w-full h-screen bg-base-100 flex items-center justify-center'>
            <Loader />
        </div>
    }
    if (!loading && !user) {
        navigate('/login', { replace: true });
    }

    return (
        <main className='bg-base-100'>
            <Header />
            {children}
        </main>
    )
}

export default ProtectedRoutes;
