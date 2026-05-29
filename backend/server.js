const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend client communication
app.use(cors({
  origin: '*', // Allows Vercel deployments to interact safely
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes mounts imports
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payments');
const ticketRoutes = require('./routes/tickets');

app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/tickets', ticketRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: "active",
    platform: "CreatorOS Full-Stack REST Engine",
    date: new Date().toISOString()
  });
});

// Database connection error logger fallback middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Critical Server Error. Database is likely offline or Prisma client needs initialization.",
    error: err.message
  });
});

app.listen(PORT, () => {
  console.log(`🚀 CreatorOS Production API running on port ${PORT}`);
});
