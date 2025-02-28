import { Pool } from 'pg';
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();

// Function to resolve hostname to IPv4
const resolveHostToIPv4 = (hostname: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    dns.resolve4(hostname, (err, addresses) => {
      if (err) {
        reject(err);
      } else {
        resolve(addresses[0]); // Use the first IPv4 address
      }
    });
  });
};

// Create and initialize the pool
const initializePool = async (): Promise<Pool> => {
  try {
    const hostname = 'db.jniuqtxxemrvjnpbhopt.supabase.co';
    const ipv4Address = await resolveHostToIPv4(hostname);

    const pool = new Pool({
      user: 'postgres',
      host: ipv4Address, // Use the resolved IPv4 address
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

    // Test the connection
    await pool.query('SELECT NOW()');
    console.log('Database connected successfully');

    return pool;
  } catch (error) {
    console.error('Error initializing database pool:', error);
    throw error;
  }
};

// Initialize the pool and export it
const pool = initializePool();
export { pool };