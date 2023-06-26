
"use strict";

const express = require("express");
const router = express.Router();

const { User } = require("./models");
const bcrypt = require("bcrypt");
const basicAuthMiddleWare = require("./middleware/basic");

router.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

router.post("/signup", handelSignup);
async function handelSignup(req, res) {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const record = await User.create(req.body);
  res.status(201).json(record);
}

// Signin endpoint
router.post("/signin", basicAuthMiddleWare, handelSignin);

async function handelSignin(req, res, next) {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
}

// Get all users

router.get("/Users", handelAllUsers);
async function handelAllUsers(req, res) {
  const allUsers = await User.findAll();
  res.status(200).json(allUsers);
}

router.get("/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
