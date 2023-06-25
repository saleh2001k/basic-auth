// src/middleware/500.js
function handle500(err, req, res, next) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
  
  module.exports = handle500;
  