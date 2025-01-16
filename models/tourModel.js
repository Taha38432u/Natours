const mongoose = require("mongoose");
const slugify = require("slugify");
// const User = require("./userModel");
// const validator = require("validator");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
      trim: true,
      maxlength: [40, "A tour must have less than or equal to 40 characters"],
      minlength: [
        10,
        "A tour must have greater than or equal to 10 characters",
      ],
      // validate: [validator.isAlpha, "Tour name must only contain characters"],
    },
    slug: String,
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      required: [true, "A tour must have a duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a max group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty is either: easy, medium, difficult",
      },
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
    discount: {
      type: Number,
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator(val) {
          // `this` only points to the current document when creating NEW documents
          return val < this.price;
        },
        message: "Discount price ({VALUE}) should be below regular price",
      },
    },
    summary: {
      type: String,
      required: [true, "A tour must have a description"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have a cover image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number], // Longitude First then latitude
      address: String,
      description: String,
    },
    locations: [
      {
        // GeoJSON
        type: {
          type: String,
          default: "Point",
          enum: ["Point"],
        },
        coordinates: [Number], // Longitude First then latitude
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// This only run before .save() and .create()
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true }); // 'this' refers to the document being saved
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: "guides",
    select: "-__v -passwordChangedAt",
  });
  next();
});

// Virtual Populate
tourSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "tour",
  localField: "_id",
});

// Embedding
// tourSchema.pre("save", async function (next) {
//   const guidesPromises = this.guides.map(async (id) => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
// });

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
