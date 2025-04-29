import User from "../model/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "d92cdd9a2b7d47e773a33c3b5bb017c3df455d5c60e04cf190e1d5db60ca9038"; 
// Signup Controller
export const signup = async (req, res) => {
    const { name, email, username, password, profileImage, role } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(401).json({ error: "User already exists" });
        }

        const newUser = new User({
            name,
            email,
            username,
            password, 
            profileImage,
            role
        });

        await newUser.save();
        return res.status(201).json({ message: "User Signup Successfully !!" });
    } catch (error) {
        console.error("Error in Signup:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Login Controller
export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                role: user.role,
                profileImage: user.profileImage
            }
        });
    } catch (error) {
        console.error("Error in Login:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Logout Controller (for client-side token removal)
export const logout = (req, res) => {
    // On frontend: just remove token from localStorage/cookies
    return res.status(200).json({ message: "User logged out successfully" });
};
