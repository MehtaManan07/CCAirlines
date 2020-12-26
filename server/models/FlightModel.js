const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');
const schedule = require('node-schedule');
const { ObjectId } = mongoose.Schema;

const flightSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A flight must have a name'],
      min: [5, 'Name must be at least 5 characters long' ],
      unique: true,
      trim: true,
      // validate: [validator.isAlpha, 'Tour name must only contain characters'],
    },
    from: { type: ObjectId, ref: 'Airport', required: [true, 'Flight must have a departure airport'] },
    to: { type: ObjectId, ref: 'Airport', required: [true, 'Flight must have a arrival airport'] },
    features: [String],
    arrivalDate: {
      //up
      type: Date, // format is YYYY-MM-DD
      trim: true,
      required: [true, 'Flight requires arrival date'],
    },
    departureDate: {
      //up
      type: Date, // format is YYYY-MM-DD
      trim: true,
      required: [true, 'Flight requires departure date'],
    },
    departureString: String,
    arrivalString: String,
    crewStaff: [
      {
        type: ObjectId,
        ref: 'User', // YYYY-MM-DD 20:00 21:00
      },
    ],
    bookedSeats: [
      {
        type: ObjectId,
        ref: 'Seat',
        default: [],
      },
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

flightSchema.virtual('duration').get(function (next) {
  let dDate = this.departureDate;
  let aDate = this.arrivalDate;
  const durationTime = (aDate - dDate) / 3600000;
  return durationTime; // hours
});

// Document Middleware, runs before .save() and .create()
flightSchema.pre('save', async function (next) {
  this.departureString = this.departureDate.toISOString().split('T')[0];
  this.arrivalString = this.arrivalDate.toISOString().split('T')[0];
  this.slug = slugify(this.name, { lower: true });
  next();
});

// delete seats and bookings when a flight is deleted
flightSchema.pre('remove', async function (next) {
  console.log(`Seats being removed from flight ${this.name}`.bgBlue);
  await this.model('Booking').deleteMany({ flight: this._id });
  await this.model('Seat').deleteMany({ flight: this._id });
  // to do => delete those passengers from record as well
  next();
});

flightSchema.pre(/^find/, function (next) {
  this.populate('crewStaff', 'name role')
    .populate('from', 'name city')
    .populate('to', 'name city')
  next();
});

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;
