const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingControllers');
const advancedResults = require('../utils/filterFeatures');
const { protect, authorize } = require('../middlewares/auth');
const Booking = require('../models/BookingModel');

router.post(
  '/:flightId',
  protect,
  authorize('superuser'),
  bookingController.newBooking
);

// router
//   .route('/:id')
//   .get(bookingController.getbooking)
//   .put(protect, authorize('superuser'), bookingController.updatebooking)
//   .delete(protect, authorize('superuser'), bookingController.deletebooking);

module.exports = router;
