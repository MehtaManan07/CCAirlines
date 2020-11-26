const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const ErrorResponse = require('./server/middlewares/ErrorResponse');
const cookieSession = require('cookie-session')
const passport = require('passport');
dotenv.config({ path: './server/config/config.env' });

const app = express();
require('./server/middlewares/passport')

const connectDB = require('./server/config/db'); // load database
const errorHandler = require('./server/middlewares/errorHandler');

// 1) Global MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
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
    keys: [process.env.APP_COOKIE]
  })
);

app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
connectDB();
app.use(express.static(`${__dirname}/starter/public`));

// 3) ROUTES
app.use('/api/v1/users', require('./server/routes/userRoutes'))
app.use('/api/v1/flights', require('./server/routes/flightRoutes'))

app.all('*', (req, res, next) => {
  next(new ErrorResponse(` Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandler);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(
    `App running in ${process.env.NODE_ENV} mode on port ${port}`.blue.bold
  );
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...'.bgWhite.red);
  console.log(err.name, err);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception! 💥 Shutting down...'.red);
  console.log(err);
});