const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../middlewares/ErrorResponse');
const { Booking, Passenger } = require('../models/BookingModel');
const Seat = require('../models/SeatModel');
const Flight = require('../models/FlightModel');
const sendPdf = require('../utils/Pdf');
const Email = require('../utils/Email');

exports.newBooking = asyncHandler(async (req, res, next) => {
  /* 
  req.body = { passengers: [{ name: "JDoe", age: 69, gender: 'Male, type: "Economy" },{ name: "JDoe", age: 69, gender: 'Male', type: 'Business' }]}
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
  req.body.price = req.body.price.toFixed(3);

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

const sendInvoice = async (id, next) => {
  const booking = await Booking.findById(id);
  if (!booking) {
    return next(new ErrorResponse(`Error while sending Invoice`, 404));
  }
  try {
    await new Email(booking.user).sendBooking(id);
  } catch (error) {
    console.log(error);
  }
};

const generateInvoice = async (id, next) => {
  const booking = await Booking.findById(id);
  if (!booking) {
    return next(new ErrorResponse(`Error while sending Invoice`, 404));
  }
  try {
    await sendPdf(booking);
    req.booking = booking;
  } catch (error) {
    console.log('ugh\n');
    console.log(error);
  }
};

const calcPrice = (flight, type) => {
  const deptDate = new Date(flight.departureDate);
  const today = new Date();
  const timeDiff = deptDate.getTime() - today.getTime();
  const kTime = Math.round(timeDiff / (1000 * 60 * 60 * 24));
  let kPrice = 100;

  if (type === 'Business') kPrice = 300;
  else if (type === 'FirstClass') kPrice = 500;

  return flight.basePrice + (kPrice * flight.bookedSeats.length) / kTime;
};

exports.getAllBookings = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getBookingById = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return next(new ErrorResponse(`No booking found`, 404));
  }
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
