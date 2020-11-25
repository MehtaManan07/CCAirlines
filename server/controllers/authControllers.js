const User = require('../models/UserModel');
const ErrorResponse = require('../middlewares/ErrorResponse');
const asyncHandler = require('../middlewares/async');

exports.signup = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
  });
  sendTokenResponse(201,newUser,res)
});

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
  
    // validate password and email
    if (!email || !password) {
      return next(new ErrorResponse('Please add an email and a password', 400));
    }
  
    // check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }
    // Check if password matches
    const isMatch = await user.matchPassword(password);
  
    if (!isMatch || !user)
      return next(new ErrorResponse('Invalid credentials', 401));
  
    sendTokenResponse(200, user, res);
  });

exports.sendTokenResponse = (statusCode, user, res) => {
  const token = user.getSignedJwtToken();
  const cookieOptions = {
    expires: new Date(
      Date.now() + 2 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwtCC', token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
    success: true,
    token,
    data: user,
  });
};

exports.logout = asyncHandler(async (req, res) => {
    req.logout()
  res.clearCookie('jwtCC');
  res.status(200).json({ success: true });
});