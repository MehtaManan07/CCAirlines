const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../middlewares/ErrorResponse');
const factory = require('../utils/factoryFunctions');
const { Gate, Airport } = require('../models/AirportModel');

exports.newAirport = asyncHandler(async (req, res, next) => {
  let { latitude, longitude } = req.body;
  req.body.location = { type: 'Point', coordinates: [latitude, longitude] };
  latitude = undefined;
  longitude = undefined;

  const airport = await Airport.create(req.body);
  res.status(201).json({ success: true, data: airport });
});

exports.getAllAirports = asyncHandler(async(req,res,next) => {
  res.status(200).json(res.advancedResults)
})
exports.getAirport = asyncHandler(async (req, res, next) => {
  const airport = await Airport.findById(req.params.id);
  if (!airport) {
    return next(new ErrorResponse(`Airport not found`, 404));
  }
  res.status(200).json({ success: true, data: airport });
});

exports.getGates = asyncHandler(async (req, res, next) => {
  console.log(req.params.id)
  const airport = await Airport.findById(req.params.id).populate('gates');
  res.status(200).json({ success: true, data: airport.gates });
});

exports.deleteAirport = factory.deleteOne(Airport);
exports.updateAirport = factory.deleteOne(Airport);
