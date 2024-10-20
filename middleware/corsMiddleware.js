// middleware/corsMiddleware.js
const cors = require('cors');

const corsOptions = {
  origin: 'http://example.com', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};


const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
