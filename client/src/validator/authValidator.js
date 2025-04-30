import * as yup from "yup";

export const registerSchema = yup.object({
    name: yup.string().required('Please enter name'),
    email: yup.string().email('Invalid email format').required('Please enter email'),
    username: yup.string()
        .required('Please enter username')
        .matches(/^\w+$/, 'Username can only contain letters, numbers, and underscores')
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username cannot exceed 30 characters'),
    password: yup.string()
        .required('Please enter password')
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password cannot exceed 20 characters')
});

export const loginSchema = yup.object({
    email: yup.string().email('Invalid email format').required('Please enter email'),
    password: yup.string()
        .required('Please enter password')
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password cannot exceed 20 characters')
});
