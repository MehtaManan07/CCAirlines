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
  avaible: {
    type: Boolean,
    default: true,
  },
  priceMultiplier: Number,
});

seatSchema.pre('save', function (next) {
  switch (this.type) {
    case 'Economy':
      k = 1;
      break;
    case 'Business':
      k = 3;
      break;
    case 'FirstClass':
      k = 5;
      break;

    default:
      break;
  }
  this.priceMultiplier = k;
  next();
});

const Seat = mongoose.model('Seat', seatSchema);
module.exports = Seat;
