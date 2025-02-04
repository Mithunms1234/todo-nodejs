require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/route_todo');
const os = require('os');

const app = express();
baseUrl = '';

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/todo', todoRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Failed to connect to MongoDB', error));

  //get device ip
// const getIpAdress = () => {
//   baseUrl = os.networkInterfaces()['en0'][1]['address'];
// }

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${baseUrl}}:${PORT}`);
});
