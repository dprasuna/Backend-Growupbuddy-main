// middleware/errorMiddleware.js

const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack to the console
  
    // Check if the error has a status code
    const statusCode = err.statusCode || 500;
    
    // Send the error response
    res.status(statusCode).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
  };
  
  module.exports = errorMiddleware;
  