const mongoose = require('mongoose');

const gateSchema = new mongoose.Schema({
  name: String,
  available: {
    type: Boolean,
    default: true,
  },
  flight: {
    type: mongoose.Schema.ObjectId,
  },
});

const Gate = mongoose.model('Gate', gateSchema);

const airportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An Airport must have a name'],
    unique: true,
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'Airport must belong to a city'],
  },
  location: {
    //geoJSON
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
  },
  gates: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Gate',
    },
  ],
  nGates: {
    type: Number,
    default: 5,
  },
});

const Airport = mongoose.model('Airport', airportSchema);
module.exports = { Airport, Gate };
