const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
require('colors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const cookieSession = require('cookie-session');
const passport = require('passport');
const ErrorResponse = require('./server/middlewares/ErrorResponse');
dotenv.config({ path: './server/config/config.env' });

const app = express();
require('./server/utils/passport');

const connectDB = require('./server/config/db'); // load database
const errorHandler = require('./server/middlewares/errorHandler');

// 1) Global MIDDLEWARES
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 90,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});

app.use('/api', limiter);
app.use(express.json());
app.use(
  cookieSession({
    maxAge: 2 * 24 * 60 * 60 * 1000, // make sure it is same in jwt
    keys: [process.env.APP_COOKIE],
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
connectDB();

// 3) ROUTES
app.use('/api/v1/users', require('./server/routes/userRoutes'));
app.use('/api/v1/flights', require('./server/routes/flightRoutes'));
app.use('/api/v1/bookings', require('./server/routes/bookingRoutes'));
app.use('/api/v1/web_check', require('./server/routes/webRoutes'));
app.use('/api/v1/airports', require('./server/routes/airportRoutes'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('front/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'front', 'build', 'index.html'));
  });
}
if (process.env.NODE_ENV === 'development') {
  app.all('*', (req, res, next) => {
    next(
      new ErrorResponse(` Can't find ${req.originalUrl} on this server`, 404)
    );
  });
}

app.use(errorHandler);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(
    `App running in ${process.env.NODE_ENV} mode on port ${port}`.blue.bold
  );
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...'.red);
  console.log(`${err}`.red);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception! 💥 Shutting down...'.red);
  console.log(err);
});
