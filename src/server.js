const express = require('express');
const app = express();
const authRouter = require('./auth/router');
const handle404 = require('./middleware/404');
const handle500 = require('./middleware/500');

app.use(express.json());
app.use(authRouter);

app.use(handle404);
app.use(handle500);

module.exports = {
  app,
  start() {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  },
};
