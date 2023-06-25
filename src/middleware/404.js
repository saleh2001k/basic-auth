// src/middleware/404.js
function handle404(req, res) {
    res.status(404).send('Route not found');
  }
  
  module.exports = handle404;