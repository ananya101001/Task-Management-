import express, { Request, Response, NextFunction } from 'express';
import { register, login } from '../controllers/authController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = express.Router();

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// Register route
router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));

// Protected route
router.get('/profile', authenticateUser, (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' }); // No return here
    return; // Stop further execution
  }
  res.json({ user: req.user }); // No return here
});

export default router;