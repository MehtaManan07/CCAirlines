const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const sendPdf = require('../utils/Pdf');
const Email = require('../utils/Email');

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
  checkedIn: {
    type: Boolean,
    default: false,
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
    required: [true, 'Booking must belong to a Flight!'],
  },
  checkedIn: {
    type: Boolean,
    default: false,
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
  bagsChecked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate('passengers')
    .populate('user', 'name phoneNum email')
    console.log('p')
  next();
});

bookingSchema.pre('save', function (next) {
  this.numSeats = this.passengers.length;
  this.populate('passengers').populate('user', 'name phoneNum email');
  next();
});

bookingSchema.post('save', async function (doc, next) {
  await doc
    .populate('passengers')
    .populate('user', 'name phoneNum email')
    .execPopulate();
  await sendPdf(doc);
  await new Email(doc.user).sendBooking(doc._id);
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = { Booking, Passenger };
