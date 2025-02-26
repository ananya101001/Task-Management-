"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authController_1 = require("../controllers/authController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
var asyncHandler = function (fn) {
    return function (req, res, next) {
        return Promise.resolve(fn(req, res, next)).catch(next);
    };
};
// Register route
router.post('/register', asyncHandler(authController_1.register));
router.post('/login', asyncHandler(authController_1.login));
// Protected route
router.get('/profile', authMiddleware_1.authenticate, function (req, res) {
    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' }); // No return here
        return; // Stop further execution
    }
    res.json({ user: req.user }); // No return here
});
exports.default = router;
