import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from '../models/userModel.js'

export const register = async(req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            error: 'All fields are required',
            success: false,
        });
    }

    try {
        const userExists = await User.findOne({ email });

        if (userExists) return res.status(400).json({ error: 'User already registered', success: false },

        );

        const hashed = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashed });

        res.status(201).json({
            message: 'User registered',
            success: True
        });
    } catch {
        res.status(500).json({
            error: 'Registration error',
            success: false,
        });
    }
};