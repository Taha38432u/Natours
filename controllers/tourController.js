const Tour = require("../models/tourModel");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");
// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     res.status(400).json({
//       status: "fail",
//       message: "Please provide name and price",
//     });
//   }
//   next();
// };

exports.getAllTours = catchAsync(async (req, res) => {
  // // Filtering
  // const queryObj = { ...req.query };
  // const excludedFields = ["page", "sort", "limit", "fields"];
  // excludedFields.forEach((excludedField) => delete queryObj[excludedField]);
  //
  // let queryStr = JSON.stringify(queryObj);
  // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  // let query = Tour.find(JSON.parse(queryStr));
  //
  // // Sorting
  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(",").join(" ");
  //   query = query.sort(sortBy);
  // } else {
  //   query.sort("-createdAt");
  // }
  //
  // // Field Limiting
  // if (req.query.fields) {
  //   const fields = req.query.fields.split(",").join(" ");
  //   query = query.select(fields);
  // } else {
  //   query.select("-__v");
  // }
  //
  // // Pagination
  // const page = req.query.page * 1 || 1;
  // const limit = req.query.limit * 1 || 100;
  // const skip = (page - 1) * limit;
  //
  // query = query.skip(skip).limit(limit);
  //
  // if (req.query.page) {
  //   const numTours = await Tour.countDocuments();
  //   if (skip >= numTours) throw new Error("This page does not exist");
  // }

  // const query = Tour.find()
  //   .where("duration")
  //   .equals(5)
  //   .where("difficulty")
  //   .equals("easy");

  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tours = await features.query;

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

// eslint-disable-next-line consistent-return
exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id).populate("reviews");

  if (!tour) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

exports.createTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);

exports.getTourStats = catchAsync(async (req, res) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: "$difficulty",
        numTours: { $sum: 1 },
        numRatings: { $sum: "$ratingsAverage" },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    {
      $sort: { avgPrice: 1 }, // Ascending
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});
