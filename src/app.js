const express = require("express");
const app = express();
const path = require("path");
const subscriberModel = require("./model/subscribers");
const { specs, swaggerUi } = require("./swagger");

class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 500;
  }
}

/**
 * @swagger
 * /:
 *   get:
 *     summary: Redirect to the API page
 *     description: This endpoint redirects the client to the `/api` page.
 *     responses:
 *       302:
 *         description: Redirects to the `/api` endpoint.
 */
app.get("/", (req, res) => {
  res.redirect("/api");
});

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Swagger API Documentation
 *     description: Serves the Swagger UI for exploring API documentation.
 *     responses:
 *       200:
 *         description: Successfully served the Swagger UI.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "<html>Swagger UI content</html>"
 */
app.use("/api", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /subscribers:
 *   get:
 *     summary: Retrieve a list of subscribers
 *     description: Fetches all subscribers from the database, excluding the `__v` field.
 *     responses:
 *       200:
 *         description: A list of subscribers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the subscriber.
 *                     example: "60b8d295f1b6c8a4d4e8f3e1"
 *                   name:
 *                     type: string
 *                     description: The name of the subscriber.
 *                     example: "John Doe"
 *                   subscribedChannel:
 *                     type: string
 *                     description: The channel the subscriber is subscribed to.
 *                     example: "Tech Insights"
 *                   subscribedDate:
 *                     type: string
 *                     format: date-time
 *                     description: The date the subscriber joined.
 *                     example: "2023-11-02T14:48:00.000Z"
 *       400:
 *         description: Database Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Database Error"
 */
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

/**
 * @swagger
 * /subscribers/name:
 *   get:
 *     summary: Retrieve subscriber names
 *     description: Fetches a list of subscribers, excluding the `__v`, `_id`, and `subscribedDate` fields.
 *     responses:
 *       200:
 *         description: A list of subscribers with their names and subscribed channels.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the subscriber.
 *                     example: "Jane Doe"
 *                   subscribedChannel:
 *                     type: string
 *                     description: The channel the subscriber is subscribed to.
 *                     example: "Science Today"
 *       400:
 *         description: Invalid URL or other error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Invalid name Url"
 */
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

/**
 * @swagger
 * /subscribers/{id}:
 *   get:
 *     summary: Retrieve subscriber details by ID
 *     description: Fetches details of a subscriber based on the provided ID, excluding the `__v` field.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the subscriber.
 *         schema:
 *           type: string
 *           example: "60b8d295f1b6c8a4d4e8f3e1"
 *     responses:
 *       200:
 *         description: Subscriber details for the given ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier for the subscriber.
 *                   example: "60b8d295f1b6c8a4d4e8f3e1"
 *                 name:
 *                   type: string
 *                   description: The name of the subscriber.
 *                   example: "Alice Smith"
 *                 subscribedChannel:
 *                   type: string
 *                   description: The channel the subscriber is subscribed to.
 *                   example: "Tech Reviews"
 *                 subscribedDate:
 *                   type: string
 *                   format: date-time
 *                   description: The date the subscriber joined.
 *                   example: "2023-11-02T14:48:00.000Z"
 *       400:
 *         description: Invalid ID or other error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Invalid Id"
 */
app.get("/subscribers/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    let subscribers = await subscriberModel.findById(id).select("-__v");
    if (subscribers === null) {
      throw new Error();
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
