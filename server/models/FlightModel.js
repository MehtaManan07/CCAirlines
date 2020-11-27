const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');
const { ObjectId } = mongoose.Schema;

const flightSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      validate: [validator.isAlpha, 'Tour name must only contain characters'],
    },
    from: { type: ObjectId, ref: 'Airport' },
    to: { type: ObjectId, ref: 'Airport' },
    features: [String],
    departureTime: {
      type: String,
      required: ['Please mention departure time of flight'],
    },
    arrivalTime: {
      type: String,
      required: ['Please mention arrival time of flight'],
    },
    crewStaff: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    departureDate: {
      //up
      type: Date, // format yet to decide
      trim: true,
      required: [true, 'Flight requires departure date'],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    basePrice: {
      type: Number,
      required: [true, 'A tour must have a price'],
      trim: true,
    },
    totalSeats: Number,
    slug: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate
flightSchema.virtual('seats', {
  ref: 'Seat',
  foreignField: 'flight',
  localField: '_id',
});

// Document Middleware, runs before .save() and .create()
flightSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  console.log(this.departureDate);
  next();
});

flightSchema.pre(/^find/, function (next) {
  this.populate('crewStaff', 'name role')
    .populate('from', 'name')
    .populate('to', 'name');
  next();
});

flightSchema.pre('save', function (next) {
  this.seatsAvailable = this.numberOfSeats - this.bookedSeats;
  next();
});

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;
