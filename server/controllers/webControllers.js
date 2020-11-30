const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../middlewares/ErrorResponse');
const { Booking, Passenger } = require('../models/BookingModel');
const Seat = require('../models/SeatModel');
const Flight = require('../models/FlightModel');
const User = require('../models/UserModel');

exports.chechkIn = asyncHandler(async (req, res, next) => {
  const { email, pnr } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorResponse(`Please check your EmailId`, 400));
  }
  const booking = await Booking.findOne({ _id: pnr, checkedIn: false });
  if (!booking) {
    return next(new ErrorResponse(`Please check you PNR number, or you have already checked in`, 400));
  }
  if(user._id !== booking.user._id) {
    return next(new ErrorResponse(`You cannot touch anyone else's booking`, 400));
  }

  const newBook = await Booking.findByIdAndUpdate(
    pnr,
    { checkedIn: true },
    { new: true }
  );
  res.status(200).json({ success: true, data: newBook });
});

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
