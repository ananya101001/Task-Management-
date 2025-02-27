import { Request, Response } from 'express';
const bcrypt = require('bcryptjs');;
import jwt from 'jsonwebtoken';
import { pool } from '../db/db';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userExists.rows.length > 0) {
      res.status(400).json({ message: 'Username already exists' });
      return;
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
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
  console.log('reached here')
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
      { userId: user.id, username: user.username, email: user.email }, // Use `id` instead of `userId`
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error', error: error });
  }
};