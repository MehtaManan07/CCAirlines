const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightControllers');

const { protect, authorize } = require('../middlewares/auth');
const Flight = require('../models/FlightModel');
const Seat = require('../models/SeatModel');

router
  .route('/')
  .post(protect, authorize('superuser'), flightController.createFlight)
  .get(flightController.getAllFlights);
  
router.get('/seats/all', flightController.getAllSeats);

router.get('/seat/:id', flightController.getSeatsForFlight);
router
  .route('/:id')
  .get(flightController.getFlight)
  .put(protect, authorize('superuser'), flightController.updateFlight)
  .delete(protect, authorize('superuser'), flightController.deleteFlight);

module.exports = router;
