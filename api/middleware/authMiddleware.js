import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';
import asyncHandler from 'express-async-handler';

const isAuth = asyncHandler(async (req, res, next) => {
    // Check for token in Authorization header
    const authorization = req.headers.authorization;
    let token = '';
    if (authorization && authorization?.startsWith('Bearer')) {
        token = authorization.split(' ')[1];
    }

    // If not in header, check cookies
    if (!token) {
        token = req.cookies.token;
    }

    // Verify token exists
    if (!token) {
        res.status(401);
        throw new Error('Unauthorized access. Please login.');
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user
        const user = await User.findById(decoded.id).select('-password -following -followers');

        // Check if user is active
        if (!user.active) {
            res.status(401);
            res.clearCookie('token');
            throw new Error('Your account has been deactivated. Please contact admin.');
        }

        if (!user) {
            res.status(401);
            throw new Error('Unauthorized access. Please login.');
        }
        // Set user in request
        // req.user = decoded;
        req.user = user;

        next();
    } catch (error) {
        res.status(401);
        // Provide more specific error messages based on JWT error type
        if (error.name === 'JsonWebTokenError') {
            throw new Error('Invalid token. Please login again.');
        } else if (error.name === 'TokenExpiredError') {
            throw new Error('Token expired. Please login again.');
        } else {
            throw new Error('Unauthorized access. Please login.');
        }
    }
});

export default isAuth;
