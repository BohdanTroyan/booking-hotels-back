const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something went wrong while getting list of users.",
      });
    });
};
// Create and Save a new User
exports.create = async (req, res) => {
  // Validate request

  let login =
    (await User.findOne({ login: req.body.login })) == undefined ? "" : 1;

  if (req.body.login === "" || req.body.password === "") {
    return res.status(400).send({
      message: "Please fill all required field",
    });
  } else if (login === 1) {
    return res.status(400).send({
      message: "User already created!",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  // Create a new User
  const user = new User({
    login: req.body.login,
    password: hashedPassword,
    balance: req.body.balance,
  });
  try {
    await user.save();
    res.send({ message: "Registration succsess" });
  } catch (err) {
    res.status(400).send(err);
  }
};
// Find a single User with a id
exports.login = async (req, res) => {
  const user = await User.findOne({ login: req.body.login });
  console.log(req.body);

  if (!user) return res.status(400).send("Login is not found");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  res.send({
    responseCode: 0,
    login: req.body.login,
    balance: user.balance,
  });
};

exports.findOne = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error getting user with id " + req.params.id,
      });
    });
};
