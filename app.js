const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
// const bookingRouter = require("./routes/bookingRoutes");
const AppError = require("./utils/appError");
const GlobalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 100,
  message: "Too many requests from this IP, please try again in an hour",
});

app.use("/api", limiter);

app.use(express.json());

app.use(mongoSanitize());

app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  }),
);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
// app.use("/api/v1/bookings", bookingRouter);

app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "Fail",
  //   message: `Can't find ${req.originalUrl} on this server`,
  // });
  // next();

  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(GlobalErrorHandler);

module.exports = app;
