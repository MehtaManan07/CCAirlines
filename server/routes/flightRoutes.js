const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightControllers');
const advancedResults = require('../middlewares/filterFeatures');
const { protect, authorize } = require('../middlewares/auth');
const Flight = require('../models/FlightModel');
const Seat = require('../models/SeatModel');

router
  .route('/')
  .post(protect, authorize('superuser'), flightController.createFlight)
  .get(advancedResults(Flight,'seats'), flightController.getAllFlights);

  router.get('/seats', async(req,res) => {
    const seats = await Seat.find({}).populate('flight')
    res.json(seats)
  })
router
  .route('/:id')
  .get(flightController.getFlight)
  .put(protect, authorize('superuser'), flightController.updateFlight)
  .delete(protect, authorize('superuser'), flightController.deleteFlight);

module.exports = router;
