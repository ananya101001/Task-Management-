import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = express.Router();

// These routes are using authenticateUser, which types `req` as `AuthRequest`
router.get('/', authenticateUser, getTasks);
router.post('/', authenticateUser, createTask);
router.put('/:id', authenticateUser, updateTask);
router.delete('/:id', authenticateUser, deleteTask);

export default router;