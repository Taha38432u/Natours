const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");
const APIFeatures = require("../utils/apiFeatures");

exports.fillTourANdUserForCreate = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
}; 

exports.getReviews = catchAsync(async (req, res, next) => {
  let filter;

  if (req.params.tourId) filter = { tour: req.params.tourId };

  const features = new APIFeatures(Review.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const reviews = await features.query;

  // const reviews = await Review.find(filter);
  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
});

exports.createReview = factory.createOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
