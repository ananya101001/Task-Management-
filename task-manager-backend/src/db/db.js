"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
var pg_1 = require("pg");
var dotenv_1 = require("dotenv"); // Use named import
(0, dotenv_1.config)(); // Call the config function to load environment variables
exports.pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
