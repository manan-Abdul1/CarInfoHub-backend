const express = require('express');
const { createCar, deleteCar, getCarsByUserId } = require('../controllers/carController');
const router = express.Router();

router.post('/', createCar);
router.delete("/:carId", deleteCar);
router.get('/user/:userId', getCarsByUserId);

module.exports = router;
