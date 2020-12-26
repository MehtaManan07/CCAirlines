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
  boarded: {
    type: Boolean,
    default: false,
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
  user: {
    type: ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a User!'],
  },
  price: {
    type: Number,
    trim: true,
  },
  checkedIn: {
    type: Boolean,
    default: false,
  },
  paid: {
    type: Boolean,
    default: true,
  },
  active: {
    type: Boolean,
    default: true,
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
  this.populate({ path: 'passengers', populate: { path: 'seat' } })
    .populate('flight', '-createdAt -updatedAt')
    .populate('user', 'name phoneNum email');
  next();
});

bookingSchema.pre('save', function (next) {
  this.numSeats = this.passengers.length;
  next();
});

bookingSchema.post('save', async function (doc, next) {
  await doc
    .populate('passengers.seat')
    .populate('user', 'name phoneNum email')
    .execPopulate();
  await sendPdf(doc);
  await new Email(doc.user).sendBooking(doc._id);
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = { Booking, Passenger };
