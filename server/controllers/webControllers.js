const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../middlewares/ErrorResponse');
const { Booking, Passenger } = require('../models/BookingModel');
const Seat = require('../models/SeatModel');
const User = require('../models/UserModel');
const moment = require('moment');
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
    checkedIn: false,
    active: true,
  }).populate('flight', 'departureDate arrivalDate');
  if (!booking) {
    return next(
      new ErrorResponse(
        `Please check you PNR number, or you have already checked in`,
        400
      )
    );
  }
  let { departureDate } = booking.flight;
  let today = new Date();
  today = moment.utc(today).local().format()

  if ((departureDate - today) / 3600000 < 0.25) {
    return next(new ErrorResponse(`Sorry the counter is closed`, 400));
  }

  if ((departureDate - today) / 3600000 > 2) {
    console.log({ departureDate, today })
    console.log((departureDate - today) / 3600000 )
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
  // req.body = { passengerId, reqSeatId }
  const { passengerId, reqSeatId } = req.body;
  const p1 = await Passenger.findOne({
    _id: passengerId,
    boarded: false,
    checkedIn: true,
  }); // aa aaivo

  if (!p1) {
    return next(
      new ErrorResponse(
        `Either you have not checked in or You have already finalized your seat`
      )
    );
  }
  const s1 = await Seat.findOne({ _id: p1.seat }); // p1 seat

  const s2 = await Seat.findOne({ _id: reqSeatId, boarded: false });
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
  const p2 = await Passenger.findOne({ seat: s2 });
  // update seat that is requested
  const updatedSeat = await Seat.findByIdAndUpdate(
    s2._id,
    { boarded: true, available: false },
    { new: true, runValidators: true }
  );
  // update passenger who requested
  const pass1 = await Passenger.findByIdAndUpdate(
    p1._id,
    { seat: s2, boarded: true },
    { new: true, runValidators: true }
  ).populate('seat');
  // update passenger of previous seat2;
  let pass2;
  if (p2) {
    pass2 = await Passenger.findByIdAndUpdate(
      p2._id,
      { seat: s1 },
      { new: true, runValidators: true }
    ).populate('seat');
  }

  res.status(200).json({ success: true, data: { pass1, updatedSeat } });
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
    return next(
      new ErrorResponse(
        `Make sure you have checked in or you might have already checked your luggage in`,
        400
      )
    );
  }
  let addPrice = 0;
  if (weight > 15) {
    addPrice = (weight - 15) * 200;
  }
  if (weight > 100) {
    return next(new ErrorResponse(`You can't carry more than 100 kg with you`));
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
