const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotel.controllers");
// Retrieve all hotels
router.get("/", hotelController.findAll);

router.post("/", hotelController.create);

router.put("/booked/", hotelController.booked);

module.exports = router;
