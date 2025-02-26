 // Adjust the import path as needed
 import { AuthUser } from '../auth';


 declare global {
    namespace Express {
      interface Request {
        user?: AuthUser;
      }
    }
  }
