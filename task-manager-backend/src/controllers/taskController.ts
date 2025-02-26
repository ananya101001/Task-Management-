// src/controllers/taskController.ts
import { Response } from 'express';
import { pool } from '../db/db';
import { AuthRequest } from '../types/express';

export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
   
    const userId = req.user.id;
    
    console.log('Fetching tasks for user ID:', userId);
    const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
    // const result = await pool.query('SELECT * FROM tasks WHERE user_id = 1');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal server error', error: error });
  }
};


export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const { title, description } = req.body;
  const userId = req.user.id;
  const result = await pool.query(
    'INSERT INTO tasks (title, description, user_Id) VALUES ($1, $2, $3) RETURNING *',
    [title, description, userId]
  );
  res.json(result.rows[0]);
};

export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const { id } = req.params;
  console.log(req.body)
  const { title, description, is_complete } = req.body;
  const result = await pool.query(
    'UPDATE tasks SET title = $1, description = $2, is_complete = $3 WHERE id = $4 RETURNING *',
    [title, description, is_complete, id]
  );
  res.json(result.rows[0]);
};

export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const { id } = req.params;
  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  res.json({ message: 'Task deleted' });
};
