const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../middlewares/ErrorResponse');
const { Booking, Passenger } = require('../models/BookingModel');
const Seat = require('../models/SeatModel');
const Flight = require('../models/FlightModel');

exports.selectSeat = asyncHandler(async (req, res, next) => {
  // req.body = { passengerId, reqSeatId, flightId }
  const { passengerId, reqSeatId } = req.body;
  const p1 = await Passenger.findById(passengerId); // aa aaivo
  const s1 = await Seat.findOne({ _id: p1.seat }); // p1 seat

  const p2 = await Passenger.findOne({ seat: reqSeatId });
  const s2 = await Seat.findOne({ _id: p2.seat, boarded: false });
  if (!s2) {
    return next(
      new ErrorResponse(`The seat you requested is unavailable`, 404)
    );
  }
  if (s2.type !== s1.type) {
    return next(
      new ErrorResponse(`You can only select among ${s1.type} class`)
    );
  }
  const updatedSeat = await Seat.findByIdAndUpdate(
    s2._id,
    { boarded: true },
    { new: true, runValidators: true }
  );
  const pass1 = await Passenger.findByIdAndUpdate(
    p1._id,
    { seat: s2 },
    { new: true, runValidators: true }
  ).populate('seat');
  const pass2 = await Passenger.findByIdAndUpdate(
    p2._id,
    { seat: s1 },
    { new: true, runValidators: true }
  ).populate('seat');
  res.status(200).json({ success: true, data: { pass1, pass2, updatedSeat } });
});
