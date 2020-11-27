const mongoose = require('mongoose');
const airportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An Airport must have a name'],
    unique: true,
    trim: true,
  },
  city: {
    type: String,
    required: [true, "Airport must belong to a city"]
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

const Airport = mongoose.model('Airport',airportSchema)
module.exports = Airport

// name
// arriving_flights
// departing_flights
