const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('./ErrorResponse');
const User = require('../models/UserModel');

// Protected routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwtCC) {
    token = req.cookies.jwtCC;
  }

  // Make sure token is send;
  if (!token) {
    return next(
      new ErrorResponse('Not authorized to access the resourceee', 401)
    );
  }

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user.changedPasswordAfter(decoded.iat)) {
      return next(
        new ErrorResponse(
          `User recently changed password, please login again!!`,
          401
        )
      );
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(`reached errorr`);
    console.log(error.message);
    return next(
      new ErrorResponse('Not authorized to access the resource', 401)
    );
  }
});

// Grant access to specific roles...
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is unauthorized to access this route`,
          401
        )
      );
    }
    next();
  };
};
