"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const db_1 = require("../db/db");
const getTasks = async (req, res) => {
    var _a;
    try {
        const client = await (await db_1.pool).connect(); // Await the pool promise
        const result = await client.query('SELECT * FROM tasks WHERE user_id = $1', [(_a = req.user) === null || _a === void 0 ? void 0 : _a.id]);
        res.status(200).json(result.rows);
        client.release();
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getTasks = getTasks;
const createTask = async (req, res) => {
    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const { title, description } = req.body;
    const userId = req.user.id;
    try {
        const client = await (await db_1.pool).connect(); // Await the pool promise
        const result = await client.query('INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *', [title, description, userId]);
        res.status(201).json(result.rows[0]);
        client.release();
    }
    catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.createTask = createTask;
const updateTask = async (req, res) => {
    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const { id } = req.params;
    const { title, description, is_complete } = req.body;
    try {
        const client = await (await db_1.pool).connect(); // Await the pool promise
        const result = await client.query('UPDATE tasks SET title = $1, description = $2, is_complete = $3 WHERE id = $4 AND user_id = $5 RETURNING *', [title, description, is_complete, id, req.user.id]);
        res.status(200).json(result.rows[0]);
        client.release();
    }
    catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const { id } = req.params;
    try {
        const client = await (await db_1.pool).connect(); // Await the pool promise
        await client.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2', [id, req.user.id]);
        res.status(200).json({ message: 'Task deleted' });
        client.release();
    }
    catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.deleteTask = deleteTask;
