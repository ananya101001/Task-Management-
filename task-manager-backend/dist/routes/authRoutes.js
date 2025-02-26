"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
// Register route
router.post('/register', asyncHandler(authController_1.register));
router.post('/login', asyncHandler(authController_1.login));
// Protected route
router.get('/profile', authMiddleware_1.authenticateUser, (req, res) => {
    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' }); // No return here
        return; // Stop further execution
    }
    res.json({ user: req.user }); // No return here
});
exports.default = router;
