const Flight = require('../models/FlightModel');
const { Airport } = require('../models/AirportModel');
const Seat = require('../models/SeatModel');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../middlewares/ErrorResponse');
const factory = require('../utils/factoryFunctions');
const mongoose = require('mongoose');
const Pusher = require('pusher');

const pusher = new Pusher({
  appId: '1128856',
  key: 'ea0ef1441bbd85bef8fb',
  secret: 'd28e01bc8b364e179761',
  cluster: 'ap2',
  useTLS: true,
});

exports.getAllFlights = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getFlight = asyncHandler(async (req, res, next) => {
  const flight = await Flight.findById(req.params.id).populate('seats');
  if (!flight) {
    return next(
      new ErrorResponse(`No flight found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: flight });
});

exports.createFlight = asyncHandler(async (req, res, next) => {
  /* req.body = { name, to, from, features, arrivalDate, CrewStaff, departureDate, isAvailable, seatsToAdd: { Economy: 50, Business: 25, FirstClass: 15  } } */
  const { to, from } = req.body;
  console.log(req.body);

  // check for negative duration
  let duration =
    new Date(req.body.arrivalDate) - new Date(req.body.departureDate);
  if (duration <= 0) {
    return next(
      new ErrorResponse(`Flight cannot arrive before departing, lol`, 400)
    );
  }
  //calculating distance
  const departure = await Airport.findById(from);
  if (!departure) {
    return next(new ErrorResponse('No flight found with that airport id'));
  }
  const [lat1, lng1] = departure.location.coordinates;

  const distances = await Airport.aggregate([
    // needs to be the first stage on our pipeline
    {
      $geoNear: {
        near: { type: 'Point', coordinates: [lng1 * 1, lat1 * 1] },
        distanceField: 'distance',
        distanceMultiplier: 0.001,
      },
    },
  ]);
  const { distance } = distances.filter(
    (dist) => dist._id.toString() === to.toString()
  )[0];
  req.body.distance = distance.toFixed(2);
  req.body.basePrice = distance.toFixed(2) * 0.5; // rupees
  let sum = Object.values(req.body.seatsToAdd)
    .map((a) => a * 1)
    .reduce((a, b) => a + b, 0);

  if (sum > 150 || sum < 20) {
    return next(new ErrorResponse(`Seats should be between 20 and 150`, 400));
  }

  // creating flight
  const newFlight = await Flight.create(req.body);

  // creating seats
  const entries = Object.entries(req.body.seatsToAdd);
  const seatsToEnter = entries
    .map((entry) => convert(entry, newFlight._id))
    .reduce((a, b) => a.concat(b));
  const seatsAdded = await Seat.insertMany(seatsToEnter);
  if (!seatsAdded) {
    return next(new ErrorResponse(`Server Error`, 500));
  }
  newFlight.totalSeats = seatsAdded.length;
  await newFlight.save();
  console.log(newFlight);
  res.status(201).json({
    success: true,
    data: newFlight,
  });
});

const convert = (arr, flight) => {
  let count = 0;
  const [type, quantity] = arr;
  const history = [];
  for (let i = 0; i < quantity; i++) {
    const ret = {
      flight,
      seatName: `${type.split('')[0]}_${count}`,
      type,
    };
    count++;
    history.push(ret);
  }
  return history;
};

exports.updateFlight = factory.updateOne(Flight);

exports.deleteFlight = factory.deleteOne(Flight);

exports.getSeatsForFlight = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const seats = await Seat.find({ flight: id });
  if (!seats) {
    return next(new Error(`No seats`, 404));
  }
  res.json({ success: true, data: seats });
});

exports.getSingleSeat = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const seat = await Seat.findOne({ _id: id });
  if (!seat) {
    return next(new Error(`No seat`, 404));
  }
  res.json({ success: true, data: seat });
});

exports.getAllSeats = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('DB OPENED');
  const flightCollection = db.collection('seats');
  const changeStream = flightCollection.watch();
  changeStream.on('change', async (change) => {
    if (change.operationType === 'update') {
      console.log('change -> \n');
      let seat = await Seat.findById(change.documentKey._id);
      pusher.trigger('my-channel', 'my-event', {
        id: seat._id,
      });
    }
  });
});
