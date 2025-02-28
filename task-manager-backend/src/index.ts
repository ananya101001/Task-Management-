import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(express.json()); // Add this line to parse JSON bodies

app.use(cors({
  origin: 'https://task-management-rho-teal.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors());

app.use('/api/tasks', taskRoutes);
app.use('/auth', authRoutes); // Changed this line

// Catch-all for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
