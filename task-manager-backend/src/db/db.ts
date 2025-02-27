import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Parse the DATABASE_URL
const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({
  user: 'postgres',
  host: 'db.jniuqtxxemrvjnpbhopt.supabase.co', // Use a valid hostname or IPv4 address
  database: 'postgres',
  password: 'Grep{!8923!}',
  port: 5432,
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

