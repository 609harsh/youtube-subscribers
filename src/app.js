const express = require("express");
const app = express();
const subscriberModel = require("./model/subscribers");
const { specs, swaggerUi } = require("./swagger");

class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 500;
  }
}

app.get("/", (req, res) => {
  res.redirect("/api");
});

app.use("/api", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/subscribers", async (req, res) => {
  try {
    // get all the subscribers from the database and exclude the __v field
    const subscribers = await subscriberModel.find().select("-__v");
    //
    res.status(200).json(subscribers);
  } catch (err) {
    next(new CustomError("Database Error", 400));
  }
});

app.get("/subscribers/name", async (req, res) => {
  // To retrieve a list of subscribers
  try {
    const subscribers = await subscriberModel
      .find()
      .select("-__v -_id -subscribedDate");
    res.status(200).json(subscribers);
  } catch (err) {
    next(new CustomError("Invalid name Url", 400));
  }
});

app.get("/subscribers/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    let subscribers = await subscriberModel.findById(id).select("-__v");
    if (subscribers === null) {
      next(new CustomError("No user Exist", 400));
      return;
    }
    res.status(200).json(subscribers);
  } catch (err) {
    next(new CustomError("Invalid Id", 400));
  }
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

module.exports = app;
