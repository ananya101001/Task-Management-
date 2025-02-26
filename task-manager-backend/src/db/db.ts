import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Parse the DATABASE_URL
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // Required for Supabase
  },
});

export default pool;