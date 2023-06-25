// const express = require("express");
// const { User } = require("./models");
// const basicAuth = require("./middleware/basic");
// const bcrypt = require("bcrypt");
// const base64 = require("base-64");

// const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("Welcome to the server!");
// });

// router.post("/signup", async (req, res) => {
//   const { username, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 5);
//   const record = await User.create({
//     username: username,
//     password: hashedPassword,
//   });
//   res.status(201).json(record);
// });

// // Signin endpoint
// router.post("/signin", async (req, res) => {
//   console.log(req.body);
//   console.log(req.headers.authorization);
//   if (req.headers.authorization) {
//     const authData = req.headers.authorization.split(" ");

//     const encodedData = authData.pop();
//     const decodedData = base64.decode(encodedData);

//     const [username, password] = decodedData.split(":");
//     const user = await User.findOne({ where: { username } });
//     const isValid = await bcrypt.compare(password, user.password);

//     if (isValid) {
//       res.status(200).json(user);
//     } else {
//       res.status(500).json({
//         message: "This user is not Authorized",
//       });
//     }
//   } else {
//     console.log("Please enter your username andpassword");
//   }
// });

// // Get all users
// router.get("/users", async (req, res, next) => {
//   try {
//     const users = await User.findAll();
//     res.json(users);
//   } catch (error) {
//     next(error);
//   }
// });

// // Get user by ID
// router.get("/users/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findByPk(id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(user);
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;

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

async function handelSignin(req, res) {
  res.status(200).json(req.user);
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
