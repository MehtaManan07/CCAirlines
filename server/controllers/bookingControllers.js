const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../middlewares/ErrorResponse');
const Booking = require('../models/BookingModel');
const Flight = require('../models/FlightModel');

exports.newBooking = asyncHandler(async (req, res, next) => {
  const flight = await Flight.findById(req.params.flightId);
  if (!flight || !flight.isAvailable) {
    return next(new ErrorResponse(`Flight is unavailable`, 404));
  }
  req.body.user = req.user;
  req.body.flight = req.params.flightId;
  if (flight.seatsAvailable < req.body.passengers.length) {
    return next(
      new ErrorResponse(
        `Sorry! Only ${flight.seatsAvailable} seats are available.`,400
      )
    );
  }
  console.log(flight.seatsAvailable);
  res.send(req.body);
});
