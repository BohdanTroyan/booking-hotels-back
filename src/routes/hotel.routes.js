const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotel.controllers');
const authMiddleware = require('../middlewares/auth.middleware');

// Retrieve all hotels
router.get('/', authMiddleware.verifyToken, hotelController.findAll);

router.post('/', hotelController.create);

router.put('/booked/', hotelController.booked);

module.exports = router;
