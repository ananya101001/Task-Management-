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

// Create the database pool
const createPool = async () => {
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
    pool.query('SELECT NOW()', (err, res) => {
      if (err) {
        console.error('Database connection error:', err);
      } else {
        console.log('Database connected successfully:', res.rows[0]);
      }
    });

    return pool;
  } catch (error) {
    console.error('Error creating database pool:', error);
    throw error;
  }
};

// Export the pool as a promise
export const pool = createPool();