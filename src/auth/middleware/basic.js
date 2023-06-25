'use strict'
const base64 = require('base-64');
const { User } = require('../models');

async function basicAuth(req, res, next) {
  if (!req.headers.authorization) {
    return next(new Error('Unauthorized'));
  }

  const encodedCreds = req.headers.authorization.split(' ')[1];
  const decodedCreds = base64.decode(encodedCreds);
  const [username, password] = decodedCreds.split(':');

  try {
    const user = await User.authenticateBasic(username, password);
    req.user = user;
    next();
  } catch (error) {
    next(new Error('Invalid Login'));
  }
}

module.exports = basicAuth;
