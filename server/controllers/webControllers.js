const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../middlewares/ErrorResponse');
const { Booking, Passenger } = require('../models/BookingModel');
const Seat = require('../models/SeatModel');
const Flight = require('../models/FlightModel');
const User = require('../models/UserModel');

// 1. Check in through email and pnr;
// 2. Option for selection of seats
// 3. Check individual passenger in

exports.chechkIn = asyncHandler(async (req, res, next) => {
  const { pnr } = req.params;
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorResponse(`Please check your EmailId`, 400));
  }
  const booking = await Booking.findOne({
    _id: pnr,
    // checkedIn: false,
  }).populate('flight', 'departureDate arrivalDate');
  if (!booking) {
    return next(
      new ErrorResponse(
        `Please check you PNR number, or you have already checked in`,
        400
      )
    );
  }
  const { departureDate } = booking.flight;
  const today = new Date();

  if ((departureDate - today) / 3600000 < 0.25) {
    return next(new ErrorResponse(`Sorry the counter is closed`, 400));
  }

  if ((departureDate - today) / 3600000 > 2) {
    return next(
      new ErrorResponse(
        `You can noly check in before 2 hours of departure`,
        400
      )
    );
  }

  if (user._id.toString() !== booking.user._id.toString()) {
    return next(
      new ErrorResponse(`You cannot touch anyone else's booking`, 400)
    );
  }

  for (let i = 0; i < booking.passengers.length; i++) {
    const passenger = booking.passengers[i];
    await Passenger.findByIdAndUpdate(
      passenger,
      { checkedIn: true },
      { runValidators: true }
    );
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

exports.checkBaggage = asyncHandler(async (req, res, next) => {
  const { weight } = req.body;
  const { bookingId } = req.params;
  let oldBooking = await Booking.findOne({
    _id: bookingId,
    checkedIn: true,
    bagsChecked: false,
  });
  if (!oldBooking) {
    return next(new ErrorResponse(`Make sure you have checked in`, 400));
  }
  let addPrice = 0;
  if (weight > 15) {
    addPrice = (weight - 15) * 200;
  }
  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    { price: oldBooking.price + addPrice, bagsChecked: true },
    { new: true, runValidators: true }
  );
  res.status(200).json({ success: true, data: booking });
});

exports.generateBoardingPass = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findOne({
    _id: req.params.id,
    bagsChecked: true,
    checkedIn: true,
  }).populate('flight passengers user');
  if (!booking) {
    return new ErrorResponse(
      `Please check if you have completed all previous procedures`
    );
  }
  res.status(200).json({ success: true, data: booking });
});
