import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MdOutlineMail } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const schema = yup.object({
    email: yup.string().email('Invalid email format').required('Please enter email'),
    password: yup.string()
        .required('Please enter password')
        .matches(/.*[A-Z].*/, 'Must contain an uppercase letter')
        .matches(/.*[a-z].*/, 'Must contain a lowercase letter')
        .matches(/.*\d.*/, 'Must contain a number')
        .matches(/.*[`~<>?,./!@#$%^&*()\\-_+="'|{}\[\];:\\].*/, 'Must contain a special character')
        .min(6, 'At least 6 characters')
        .max(20, 'Max 20 characters')
});

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data);
        // Handle login logic here
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="relative">
                        <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-indigo-500">
                            <MdOutlineMail className="text-gray-500 mr-2" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                {...register('email')}
                                autoComplete="off"
                                className="w-full outline-none text-sm text-gray-700 bg-transparent"
                            />
                        </div>
                        {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="relative">
                        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-indigo-500 relative">
                            <FiLock className="text-gray-500 mr-2" />
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Enter your password"
                                {...register('password')}
                                autoComplete="off"
                                className="w-full outline-none text-sm text-gray-700 bg-transparent"
                            />
                            <span
                                className="absolute right-3 cursor-pointer text-gray-500 hover:text-indigo-500"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                            >
                                {passwordVisible ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </span>
                        </div>
                        {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-indigo-600 hover:underline font-semibold">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
