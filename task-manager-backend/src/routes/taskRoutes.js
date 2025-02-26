"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/taskRoutes.ts
var express_1 = __importDefault(require("express"));
var authMiddleware_1 = require("../middleware/authMiddleware");
var taskController_1 = require("../controllers/taskController");
var router = express_1.default.Router();
// Helper function to wrap async route handlers
var asyncHandler = function (fn) {
    return function (req, res, next) {
        return Promise.resolve(fn(req, res, next)).catch(next);
    };
};
// Get tasks
router.get('/', authMiddleware_1.authenticate, asyncHandler(taskController_1.getTasks));
// Create task
router.post('/', authMiddleware_1.authenticate, asyncHandler(taskController_1.createTask));
// Update task
router.put('/:id', authMiddleware_1.authenticate, asyncHandler(taskController_1.updateTask));
// Delete task
router.delete('/:id', authMiddleware_1.authenticate, asyncHandler(taskController_1.deleteTask));
exports.default = router;
