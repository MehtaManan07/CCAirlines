const mongoose = require('mongoose');
const slugify = require('slugify');
const { ObjectId } = mongoose.Schema;

const flightSchema = new mongoose.Schema(
  {
    name: {
      // up
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [39, 'A tour name must have less than 40 characters'],
      minlength: [4, 'A tour name must have more than 10 characters'],
      // validate: [validator.isAlpha, "Tour name must only contain characters"],
    },
    class: {
      //yet to decide
      type: String,
      enum: ['economy', 'business', 'first-class'],
    },
    basePrice: {
      // calc
      type: Number,
      required: [true, 'A tour must have a price'],
      trim: true,
    },
    features: {
      //up
      type: [String],
    },
    seatsAvailable: {
      // up || default
      type: Number,
      trim: true,
      default: 320,
      maxlength: 320,
    },
    bookedSeats: {
      type: Number,
      default: 0,
    },
    numberOfSeats: {
      type: Number,
      trim: true,
      default: 320,
      max: 320,
    },
    crewStaff: [
      // up
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    departureDate: {
      //up
      type: Date, // format yet to decide
      trim: true,
      required: [true, 'Flight requires departure times'],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    from: { type: ObjectId, ref: 'City' }, // up
    to: { type: ObjectId, ref: 'City' }, // up
    slug: {
      // code
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate
// tourSchema.virtual('reviews', {
//   ref: 'Review',
//   foreignField: 'trip',
//   localField: '_id',
// });

// Document Middleware, runs before .save() and .create()
flightSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  console.log(this.departureDate);
  next();
});

flightSchema.pre(/^find/, function (next) {
  this.populate('crewStaff', '-photo')
    .populate('from', 'name')
    .populate('to', 'name');
  next();
});

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;
