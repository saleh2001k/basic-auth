"use strict";
const bcrypt = require("bcrypt");
const base64 = require("base-64");
const { User } = require("../models");

async function basicAuthMiddleWare(req, res, next) {
  if (req.headers.authorization) {
    const basicHeaderParts = req.headers.authorization.split(" ");
    const encodedValues = basicHeaderParts.pop();
    const decodedValues = base64.decode(encodedValues);
    const [username, password] = decodedValues.split(":");

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    return res.status(401).json({ message: "Authorization header missing" });
  }
}

module.exports = basicAuthMiddleWare;
