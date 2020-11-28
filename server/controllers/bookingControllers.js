const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../middlewares/ErrorResponse');
const { Booking, Passenger } = require('../models/BookingModel');
const Seat = require('../models/SeatModel');
const Flight = require('../models/FlightModel');

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
  // check if seats are available in the given class
  const finalPassengers = [];
  for (let i = 0; i < req.body.passengers.length; i++) {
    const passenger = req.body.passengers[i];
    const a = await seatOps(req, passenger, flight, next);
    finalPassengers.push(a);
  }
  const passengersAdded = await Passenger.insertMany(finalPassengers);
  req.body.passengers = passengersAdded.map((p) => p._id);
  req.body.price = req.body.price.toFixed(3)
  const booking = await Booking.create(req.body)

  res.status(201).json({success: true, data: booking});
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
  req.body.price = req.body.price + p
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
  const kTime = Math.round(timeDiff / (1000 * 60 * 60 * 24));
  let kPrice = 100;
  if (type === 'Business') kPrice = 300;
  else if (type === 'FirstClass') kPrice = 500;
  return flight.basePrice + (kPrice * flight.bookedSeats.length) / kTime;
};

// 1. Check if flight is available
// 2. Find seats from that type and assign randomly
