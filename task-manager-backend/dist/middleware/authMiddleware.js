"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        // Set the user property on the request object
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Set the user property on the request object
        req.user = {
            id: decoded.userId, // Map `userId` to `id`
            username: decoded.username,
            email: decoded.email,
        };
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
exports.authenticateUser = authenticateUser;
