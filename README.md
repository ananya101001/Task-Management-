**Full-Stack Coding Challenge**

**Tech Stack Used **
**Frontend Tech Stack**

React:A JavaScript library for building user interfaces.
Used for creating the frontend components (e.g., Login, Register, TasksPage).

React Router:A library for handling routing in React applications.
Used for navigation between pages (e.g., useNavigate, Link).

Axios:A promise-based HTTP client for making API requests.
Used for sending requests to the backend (e.g., POST, PUT).

TypeScript:A typed superset of JavaScript.
Used for type-checking and improving code quality in the frontend.

CSS:Used for styling the React components (e.g., inline styles or CSS modules).

**Backend Tech Stack**

Node.js:A JavaScript runtime for building server-side applications.
Used to run the backend server.

Express.js:A web framework for Node.js.
Used to handle HTTP requests and define routes (e.g., /auth/register, /auth/login, /api/tasks).

PostgreSQL:A relational database management system.
Used to store application data (e.g., users, tasks).

pg (node-postgres):A PostgreSQL client for Node.js.
Used to interact with the PostgreSQL database from the backend.

bcrypt:A library for hashing passwords.
Used to securely hash and compare passwords during registration and login.

jsonwebtoken (JWT):A library for generating and verifying JSON Web Tokens.
Used for user authentication and authorization.

TypeScript:Used in the backend for type-checking and improving code quality.

CORS:A middleware for enabling Cross-Origin Resource Sharing.
Used to allow the frontend to communicate with the backend if they are running on different ports.

====================

How to run the backend:

1. You need to setup the PostgreSQL Backend
psql -U postgres
CREATE DATABASE task_manager;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  user_id INTEGER REFERENCES users(id)
);

2. You need to provide the environment variable
touch .env
**Database Configuration**
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=task_manager
JWT_SECRET=your_jwt_secret_key

3.Run the Backend Server
npm run dev

4. verify the backend is running
Server is running on http://localhost:5001
If port 5001 is already in use, change the port in your backend code:
change backend code:
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

===============================

How to run the frontend:

1. configure environment variables
touch .env
REACT_APP_API_URL=http://localhost:5001

2.Run the Frontend Server
npm start
This will start the development server and open the application in your default browser at http://localhost:3000

=======================================

Short Video Demo:

