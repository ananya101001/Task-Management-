"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/taskRoutes.ts
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// These routes are using authenticateUser, which types `req` as `AuthRequest`
router.get('/', authMiddleware_1.authenticateUser, taskController_1.getTasks);
router.post('/', authMiddleware_1.authenticateUser, taskController_1.createTask);
router.put('/:id', authMiddleware_1.authenticateUser, taskController_1.updateTask);
router.delete('/:id', authMiddleware_1.authenticateUser, taskController_1.deleteTask);
exports.default = router;
