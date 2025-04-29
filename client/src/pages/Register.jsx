import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiUser } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { FaEye, FaEyeSlash, FaRegCircleUser } from "react-icons/fa6";
import { FiLock } from "react-icons/fi";
import { Link } from 'react-router-dom';

const schema = yup.object({
    email: yup.string().email('Invalid email format').required('Please enter email'),
    password: yup.string()
        .required('Please enter password')
        .matches(/.*[A-Z].*/, 'Password must contain at least one uppercase letter')
        .matches(/.*[a-z].*/, 'Password must contain at least one lowercase letter')
        .matches(/.*\d.*/, 'Password must contain at least one number')
        .matches(/.*[~<>?,./!@#$%^&*()\\-_+="'|{}\[\];:\\].*/, 'Password must contain at least one special character')
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password cannot exceed 20 characters')
});

const Login = () => {

    const [passwordVisible, setPasswordVisible] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data);
        // Handle form submission here
    };


    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
            <div className="w-[95%] sm:max-w-md bg-white rounded-md shadow-sm p-4 flex items-center justify-center flex-col">
                <h2 className="text-center text-zinc-800 text-xl font-bold my-2 uppercase">Login</h2>
                <form method="post" onSubmit={handleSubmit(onSubmit)} className='w-full p-2'>
                    <div className='w-full input focus-within:outline-none focus-within:border-primary my-2'>
                        <span className="px-1"><MdOutlineMail size={16} /></span>
                        <input
                            type="text"
                            placeholder="Enter Email Address"
                            className='w-full font-medium text-md'
                            {...register('email')}
                            autoComplete='off'
                        />
                    </div>
                    {errors.email && <p className="text-error text-[13px] font-semibold">{errors.email.message}</p>}

                    <div className='w-full input focus-within:outline-none relative focus-within:border-primary my-2'>
                        <span className="px-1"><FiLock size={16} /></span>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder="Enter Password"
                            className='w-full font-medium text-md'
                            {...register('password')}
                            autoComplete='off'
                        />
                        {
                            passwordVisible ? <span onClick={() => setPasswordVisible(false)} className='cursor-pointer absolute right-3 p-2 rounded-full hover:bg-gray-100'><FaEye size={16} /></span> :
                                <span onClick={() => setPasswordVisible(true)} className='cursor-pointer absolute right-3 p-2 rounded-full hover:bg-gray-100'><FaEyeSlash size={16} /></span>
                        }
                    </div>
                    {errors.password && <p className="text-error text-[13px] font-semibold">{errors.password.message}</p>}
                    <button className="btn btn-primary w-full mt-2">Login</button>
                </form>
                <p className='text-sm font-semibold my-1'>Don't have an account? <Link to="/register" className='text-primary'>Register</Link></p>
            </div>
        </div>
    )
}