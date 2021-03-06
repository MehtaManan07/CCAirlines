const asyncHandler = require('../middlewares/async');
const factory = require('../utils/factoryFunctions');
const User = require('../models/UserModel');
const ErrorResponse = require('../middlewares/ErrorResponse');

exports.getAllUsers = asyncHandler(async(req,res,next) => {
  res.status(200).json(res.advancedResults)
})

exports.getMe = asyncHandler(async (req, res, next) => {
  const id = req.user._id;
  const user = await User.findById(id).populate('bookings')
  if (!user) {
    return next(new ErrorResponse(`No user found with that id`, 404));
  }
  res.status(200).json({ success: true, data: user });
});

