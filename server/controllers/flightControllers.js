const Flight = require('../models/FlightModel');
const Airport = require('../models/AirportModel');
const Seat = require('../models/SeatModel');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../middlewares/ErrorResponse');
const factory = require('../middlewares/factoryFunctions');

exports.aliasTopFlights = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'basePrice,name';
  next();
};

exports.getAllFlights = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
  console.log('yo boi');
});

exports.getFlight = asyncHandler(async (req, res, next) => {
  const tour = await Flight.findById(req.params.id).populate(
    'seats',
    'seatName'
  );
  if (!tour) {
    return next(
      new ErrorResponse(`No tour found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: tour });
});

exports.createFlight = asyncHandler(async (req, res, next) => {
  /* req.body = { name, to, from, features, departureTime, arrivalTime, CrewStaff, departureDate, isAvailable, seatsToAdd: { Economy: 50, Business: 25, FirstClass: 15  } } */

  const { to, from } = req.body;
  const departure = await Airport.findById(from);
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
  const newFlight = await Flight.create(req.body);

  // creating seats
  const entries = Object.entries(req.body.seatsToAdd);
  const seatsToEnter = entries
    .map((entry) => convert(entry, newFlight._id))
    .reduce((a, b) => a.concat(b));
  console.log(seatsToEnter);
  const seatsAdded = await Seat.insertMany(seatsToEnter);
  if(!seatsAdded){
    return next(new ErrorResponse(`Server Error`,500))
  }
  newFlight.totalSeats = seatsAdded.length
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
