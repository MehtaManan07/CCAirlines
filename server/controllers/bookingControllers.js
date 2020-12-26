const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../middlewares/ErrorResponse');
const { Booking, Passenger } = require('../models/BookingModel');
const Seat = require('../models/SeatModel');
const Flight = require('../models/FlightModel');
// const factory = require('../utils/factoryFunctions');
const moment = require('moment');

exports.newBooking = asyncHandler(async (req, res, next) => {
  /* 
  req.body = { passengers: [{ name: "JDoe", age: 69, gender: 'Male, type: "Economy" },{ name: "JDoe", age: 69, gender: 'Male', type: 'Business', meal: [] }]}
    */
  // check if flight is available
  const flight = await Flight.findById(req.params.flightId);
  if (!flight || !flight.isAvailable) {
    return next(new ErrorResponse(`Flight is unavailable`, 404));
  }

  req.body.price = 0;
  req.body.user = req.user._id;
  req.body.flight = req.params.flightId;

  const finalPassengers = [];
  for (let i = 0; i < req.body.passengers.length; i++) {
    const passenger = req.body.passengers[i];
    const a = await seatOps(req, passenger, flight, next);
    finalPassengers.push(a);
  }
  const passengersAdded = await Passenger.insertMany(finalPassengers);

  req.body.passengers = passengersAdded.map((p) => p._id);
  req.body.price = Math.round(req.body.price.toFixed(3));

  const booking = await Booking.create(req.body);
  res.status(201).json({ success: true, data: booking });
});

const seatOps = async (req, passenger, flight, next) => {
  const seats = await Seat.find({
    flight: req.params.flightId,
    type: passenger.type,
    available: true,
  });
  if (!seats || seats.length < 1) {
    return next(
      new ErrorResponse(`No seats available for ${passenger.type} class`, 400)
    );
  }

  let seat = seats[Math.floor(Math.random() * seats.length)];
  const bookSeat = await Seat.findByIdAndUpdate(
    seat._id,
    { available: false },
    { new: true, runValidators: true }
  );

  const p = calcPrice(flight, passenger.type);
  req.body.price = req.body.price + p;

  delete passenger.type;

  passenger = { ...passenger, seat: bookSeat._id };
  flight.bookedSeats.push(bookSeat._id);
  await flight.save();
  return passenger;
};
const calcPrice = (flight, type) => {
  const deptDate = new Date(flight.departureDate);
  const today = new Date();
  const timeDiff = deptDate.getTime() - today.getTime();
  let kTime = Math.round(timeDiff / (1000 * 60 * 60 * 24)); // total days
  let kPrice = 100;
  kTime === 0 ? (kTime = 0.3) : kTime;
  if (type === 'Business') kPrice = 300;
  else if (type === 'FirstClass') kPrice = 500;

  return flight.basePrice + (kPrice * flight.bookedSeats.length) / kTime;
};

exports.getBookingById = asyncHandler(async (req, res, next) => {
  let booking = await Booking.findById(req.params.id);
  if (!booking) {
    return next(new ErrorResponse(`No booking found`, 404));
  }
  const flight = await Flight.findById(booking.flight._id).populate('seats');
  booking.flight = flight;
  // if (
  //   req.user._id.toString() !== booking.user.toString() ||
  //   req.user.role === 'superuser'
  // ) {
  //   return next(
  //     new ErrorResponse(`You cannot access anyone's booking details`)
  //   );
  // }
  res.status(200).json({ success: true, data: booking });
});

exports.cancelBooking = asyncHandler(async (req, res, next) => {
  let booking = await Booking.find({
    _id: req.params.id,
    checkedIn: false,
    // active: true,
  });
  booking = booking[0];
  if (!booking) {
    return next(new ErrorResponse(`No booking found`, 404));
  }
  const deptDate = new Date(booking.flight.departureDate);
  const today = new Date();
  if (deptDate - today <= 0) {
    return next(new ErrorResponse(`FLight has already departed`, 400));
  }
  const cCharges = cancelCharges(deptDate, today, booking);
  await booking.passengers.map(async (p) => {
    await Seat.findByIdAndUpdate(p.seat, { available: true });
    await Passenger.findByIdAndRemove(p._id);
  });
  await Booking.findByIdAndUpdate(req.params.id, { active: false });
  res.status(200).json({
    success: true,
    data: {
      message: 'Booking successfully cancelled',
      cancellationCharges: cCharges,
    },
  });
});

const cancelCharges = (deptDate, today, booking) => {
  let a = moment(deptDate, 'M/D/YYYY');
  let b = moment(today, 'M/D/YYYY');
  let kTime = a.diff(b, 'hours');

  kTime = kTime === 0 ? 2 : kTime;
  let kPrice;
  if (kTime <= 15 && kTime > 0) {
    kPrice = 0.9;
  } else if (kTime <= 30 && kTime > 15) {
    kPrice = 0.8;
  } else if (kTime <= 45 && kTime > 30) {
    kPrice = 0.7;
  } else kPrice = 0.3;

  return booking.price * kPrice;
};

exports.getAllBookings = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
