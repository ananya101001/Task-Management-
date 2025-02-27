"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Parse the DATABASE_URL
const connectionString = process.env.DATABASE_URL;
exports.pool = new pg_1.Pool({
    user: 'postgres',
    host: 'db.jniuqtxxemrvjnpbhopt.supabase.co', // Use a valid hostname or IPv4 address
    database: 'postgres',
    password: 'Grep{!8923!}',
    port: 5432,
    ssl: {
        rejectUnauthorized: false, // Required for Supabase
    },
});
exports.pool.on('error', (err) => {
    console.error('Database pool error:', err);
});
exports.pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection error:', err);
    }
    else {
        console.log('Database connected successfully:', res.rows[0]);
    }
});
