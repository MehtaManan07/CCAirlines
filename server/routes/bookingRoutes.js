const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingControllers');

const { protect, authorize } = require('../middlewares/auth');
const { Booking } = require('../models/BookingModel');
router.use(protect);

router.post('/:flightId', bookingController.newBooking);
router.get('/', bookingController.getAllBookings);

router.get('/:id', bookingController.getBookingById);
router.post('/cancel/:id', bookingController.cancelBooking);

// router
//   .route('/:id')
//   .get(bookingController.getbooking)
//   .put( authorize('superuser'), bookingController.updatebooking)
//   .delete( authorize('superuser'), bookingController.deletebooking);

module.exports = router;
