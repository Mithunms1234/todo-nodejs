require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/route_todo');

const app = express();
const baseUrl = '192.168.1.29';


// Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log(`[${new Date().toISOString()}] ${clientIp} - ${req.method} ${req.originalUrl}`);
  next();
});
// Routes
app.use('/todo', todoRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log('Failed to connect to MongoDB', error));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT,baseUrl,() => console.log(`Server running on ${baseUrl}}:${PORT}`));
