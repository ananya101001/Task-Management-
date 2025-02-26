// src/types/express.ts
import { Request } from 'express';
import { AuthUser } from '../types/auth';

// Ensure this matches the user object being set in your auth middleware


// Extend the global Express namespace
declare global {
  namespace Express {
    interface User extends AuthUser {} // Extend the default User type
    interface Request {
      user?: User; // Use the extended User type
    }
  }
}

export interface AuthRequest extends Request {
  user?: {
    id: number; // ✅ Ensure this is a number
  };
}


