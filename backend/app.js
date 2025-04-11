const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

require('dotenv').config();
const app = express();

// Connect to MongoDB
connectDB().then(() => {
  console.log('Database connected, starting server...');
});

app.use(express.json());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://your-frontend.vercel.app' : 'http://localhost:3000'
}));

// Routes
app.use('/api/users', authRoutes);
app.use('/api/applications', applicationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));