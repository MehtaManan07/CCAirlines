const fs = require('fs');
const mongoose = require('mongoose');
require('colors');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const { Airport, Gate } = require('../models/AirportModel');
const User = require('../models/UserModel');
const Flight = require('../models/FlightModel');
const Seat = require('../models/SeatModel');
const { Booking, Passenger } = require('../models/BookingModel');

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  () => console.log(`db connected`)
);

// Read json file
const cities = JSON.parse(fs.readFileSync(`${__dirname}/cities.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const flights = JSON.parse(
  fs.readFileSync(`${__dirname}/flights.json`, 'utf-8')
);
// import to db
const importData = async () => {
  try {
    let a = Date.now();
    await Airport.create(cities);
    await User.create(users);
    // await Flight.create(flights);
    console.log('Data imported'.bgGreen);
    let b = Date.now();
    console.log(b - a);
    process.exit(0);
  } catch (error) {
    console.error('Error:\n', error);
    process.exit(1);
  }
};

// delete from db
const deleteData = async () => {
  try {
    await Airport.deleteMany();
    await User.deleteMany();
    await Seat.deleteMany();
    await Booking.deleteMany();
    await Passenger.deleteMany();
    await Gate.deleteMany()
    await Flight.deleteMany();
    console.log('Data deleted'.bgRed);
    process.exit(0);
  } catch (error) {
    console.error('Error:\n', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
