import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

// Routes
import authRoutes from './routes/auth.js';
import challengeRoutes from './routes/challenges.js';
import userRoutes from './routes/users.js';
import migrateRoutes from './routes/migrate.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/users', userRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'GreenSteps API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Migrate route
app.use('/api/migrate', migrateRoutes);