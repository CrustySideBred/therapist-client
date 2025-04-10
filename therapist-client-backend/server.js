const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();


app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));
app.use(express.json());


app.use('/api/therapists', require('./routes/therapistRoutes'));
app.use('/api/clients', require('./routes/clientRoutes'));
app.use('/api/sessions', require('./routes/sessionRoutes'));


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});