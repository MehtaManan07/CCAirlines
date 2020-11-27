const mongoose = require('mongoose');

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
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  adult: Boolean,
});

passengerSchema.pre('save', function (next) {
  this.age > 18 ? (this.adult = true) : (this.adult = false);
  next();
});

const Passenger = mongoose.model('Passenger', passengerSchema);

const bookingSchema = new mongoose.Schema({
  passengers: [passengerSchema],
  class: {
    type: String,
    default: 'Economy',
    enum: ['Economy', 'Business', 'FirstClass'],
  },
  flight: {
    type: mongoose.Schema.ObjectId,
    ref: 'Flight',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a User!'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    trim: true,
  },
  numSeats: {
    type: Number,
  },
});

bookingSchema.pre('save', function (next) {
  this.numSeats = this.passengers.length;
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = { Booking, Passenger };
