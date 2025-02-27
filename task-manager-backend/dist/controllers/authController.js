"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt = require('bcryptjs');
;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db/db");
const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if the username already exists
        const userExists = await db_1.pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userExists.rows.length > 0) {
            res.status(400).json({ message: 'Username already exists' });
            return;
        }
        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        // Insert the new user into the database
        const result = await db_1.pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);
        // Return the newly created user
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.register = register;
const login = async (req, res) => {
    console.log('reached here');
    const { username, password } = req.body;
    try {
        // Check if the user exists in the database
        const result = await db_1.pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];
        if (!user) {
            res.status(401).json({ message: 'Username not found' });
            return;
        }
        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id, username: user.username, email: user.email }, // Use `id` instead of `userId`
        process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }
    catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error', error: error });
    }
};
exports.login = login;
