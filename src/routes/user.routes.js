const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");

// Retrieve all users
router.get("/", userController.findAll);
// Create a new user
router.post("/", userController.create);
// Retrieve a single user with id
router.get("/:id", userController.findOne);
// Login user
router.post("/login", userController.login);

module.exports = router;
