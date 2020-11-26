const Flight = require('../models/FlightModel');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../middlewares/ErrorResponse');
const factory = require('../middlewares/factoryFunctions');
const City = require('../models/CityModel');

exports.aliasTopFlights = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'ratingsAverage,price,name,summary,difficulty,slug';
  next();
};

exports.getAllFlights = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getFlight = asyncHandler(async (req, res, next) => {
  const tour = await Flight.findById(req.params.id);
  if (!tour) {
    return next(
      new ErrorResponse(`No tour found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: tour });
});

exports.createFlight = asyncHandler(async (req, res, next) => {
  const { to, from } = req.body;
  const departure = await City.findById(from);
  const [lat1, lng1] = departure.location.coordinates;

  const distances = await City.aggregate([
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
  req.body.basePrice = distance.toFixed(2) * 0.7; // rupees
  const newFlight = await Flight.create(req.body);
  res.status(201).json({
    success: true,
    data: newFlight,
  });
});

exports.flightBetweenCities = asyncHandler(async (req, res, next) => {
  const flights = await Flight.find({ to })
});

exports.updateFlight = factory.updateOne(Flight);

exports.deleteFlight = factory.deleteOne(Flight);
