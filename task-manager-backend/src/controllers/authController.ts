import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs'; // Use bcryptjs instead of bcrypt
import jwt from 'jsonwebtoken';
import { pool } from '../db/db';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const resolvedPool = await pool;
    const client = await resolvedPool.connect();
    // Check if the username already exists
    const userExists = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userExists.rows.length > 0) {
      res.status(400).json({ message: 'Username already exists' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    );

    // Return the newly created user
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    
    // Check if the user exists in the database
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
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
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error', error: error });
  }
};