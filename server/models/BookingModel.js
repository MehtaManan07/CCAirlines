const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const passengerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us passenger's name"],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, "Please specify passenger's age"],
  },
  seat: {
    type: ObjectId,
    ref: 'Seat',
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  adult: {
    type: Boolean,
  },
});

const Passenger = mongoose.model('Passenger', passengerSchema);

const bookingSchema = new mongoose.Schema({
  passengers: [
    {
      type: ObjectId,
      ref: 'Passenger',
    },
  ],
  flight: {
    type: ObjectId,
    ref: 'Flight',
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a User!'],
  },
  paid: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    trim: true,
  },
  numSeats: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

bookingSchema.pre('save', function (next) {
  this.numSeats = this.passengers.length;
  this.populate('passengers').populate(
    'flight',
    'departureDate, name, arrivalTime '
  );
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = { Booking, Passenger };
