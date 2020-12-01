const asyncHandler = require('../middlewares/async');
const factory = require('../utils/factoryFunctions');
const User = require('../models/UserModel');
const ErrorResponse = require('../middlewares/ErrorResponse');

exports.getAllUsers = factory.getAll(User);

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new ErrorResponse(`No user found with that id`, 404));
  }
  res.status(200).json({ success: true, data: user });
});
