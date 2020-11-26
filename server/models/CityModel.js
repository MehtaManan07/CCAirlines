const mongoose = require('mongoose');
const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A city must have a name'],
    unique: true,
    trim: true,
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
});

const City = mongoose.model('City',citySchema)
module.exports = City

// name
// arriving_flights
// departing_flights
