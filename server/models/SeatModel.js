const mongoose = require('mongoose');
const slugify = require('slugify');
const { ObjectId } = mongoose.Schema;

const seatSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Economy', 'Business', 'FirstClass'],
  },
  seatName: {
    type: String,
    required: [true, 'Seat must have a name'],
    trim: true,
  },
  flight: {
    type: ObjectId,
    ref: 'Flight',
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  boarded: {
    type: Boolean,
    default: false,
  },
});

const Seat = mongoose.model('Seat', seatSchema);
module.exports = Seat;
