import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Parse the DATABASE_URL
const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // Required for Supabase
  },
});

pool.on('error', (err) => {
  console.error('Database pool error:', err);
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully:', res.rows[0]);
  }
});

