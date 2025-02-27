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
    connectionString,
    ssl: {
        rejectUnauthorized: false, // Required for Supabase
    },
});
