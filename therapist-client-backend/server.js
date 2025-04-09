const express = require('express');
const cors = require('cors');
const db = require('./db'); // Import the database connection

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// Import routes
const therapistRoutes = require('./routes/therapistRoutes');
const clientRoutes = require('./routes/clientRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

// Use routes
app.use('/api/therapist', therapistRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/sesson', sessionRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});