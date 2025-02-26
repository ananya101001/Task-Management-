import { Pool } from 'pg';
import { config } from 'dotenv'; // Use named import

config(); // Call the config function to load environment variables

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});