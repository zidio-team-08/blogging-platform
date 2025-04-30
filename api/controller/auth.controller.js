import User from "../model/user.model.js";
import { validationResult } from 'express-validator';

// Signup Controller
export const signup = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: errors.array()[0].msg,
        });
    }

    const { name, email, username, password } = req.body;

    if (!name || !email || !username || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    try {

        // Check if user exists
        const existing = await User.findOne({ $or: [{ email }, { username }] }).lean();

        if (existing) {
            if (existing.email == email) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists",
                });
            }
            if (existing.username == username) {
                return res.status(400).json({
                    success: false,
                    message: "Username already exists",
                });
            }
        }

        // Create new user
        const newUser = new User({
            name,
            email,
            username,
            password,
        });

        await newUser.save();
        const token = await newUser.generateToken();

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username,
                role: newUser.role,
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

// Login Controller
export const login = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: errors.array()[0].msg,
        });
    }

    // login with username and password or email and password
    const { username, email, password } = req.body;

    if (!username && !email) {
        return res.status(400).json({
            success: false,
            message: "Email or Username is required",
        });
    }

    if (!password) {
        return res.status(400).json({
            success: false,
            message: "Password is required",
        });
    }

    try {

        const user = await User.findOne({ $or: [{ email }, { username }] }).select("+password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }

        const token = await user.generateToken();

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                role: user.role,
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

// Logout Controller 
export const logout = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({
        success: true,
        message: "Logout successful",
    });
};


