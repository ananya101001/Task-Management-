// src/controllers/taskController.ts
import { Response } from 'express';
import { pool } from '../db/db';
import { AuthRequest } from '../types/express';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const client = await (await pool).connect(); // Await the pool promise
    const result = await client.query('SELECT * FROM tasks');
    res.status(200).json(result.rows);
    client.release();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const { title, description } = req.body;
  const userId = req.user.id;
  const client = await (await pool).connect(); // Await the pool promise
    const result = await client.query(
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
  const client = await (await pool).connect(); // Await the pool promise
  const result = await client.query(
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
  const client = await (await pool).connect(); // Await the pool promise
  const result = await client.query('DELETE FROM tasks WHERE id = $1', [id]);
  res.json({ message: 'Task deleted' });
};
