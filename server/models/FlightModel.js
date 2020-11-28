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
        type: ObjectId,
        ref: 'User',
      },
    ],
    departureDate: {
      //up
      type: String, // format is YYYY-MM-DD
      trim: true,
      required: [true, 'Flight requires departure date'],
    },
    bookedSeats: [
      {
        type: ObjectId,
        ref: 'Seat',
        default: []
      }
    ],
    isAvailable: {
      type: Boolean,
      default: true,
    },
    basePrice: {
      type: Number,
      required: [true, 'A tour must have a price'],
      trim: true,
    },
    // totalSeats: Number,
    slug: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate
flightSchema.virtual('totalSeats', {
  ref: 'Seat',
  foreignField: 'flight',
  localField: '_id',
  count: true,
});
// Virtual populate
flightSchema.virtual('seats', {
  ref: 'Seat',
  foreignField: 'flight',
  localField: '_id',
});
// Document Middleware, runs before .save() and .create()
flightSchema.pre('save', async function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// delete seats when a flight is deleted
flightSchema.pre("remove", async function (next) {
  console.log(`Seats being removed from flight ${this.name}`.bgBlue);
  await this.model("Seat").deleteMany({ flight: this._id });
  next();
});


flightSchema.pre(/^find/, function (next) {
  this.populate('crewStaff', 'name role')
    .populate('from', 'name')
    .populate('to', 'name')
    .populate('totalSeats');
  next();
});

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;
