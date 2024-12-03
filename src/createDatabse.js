require("dotenv").config();
const mongoose = require("mongoose");
const subscriberModel = require("./model/subscribers");
const data = require("./data");

// Connect to DATABASE
const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Database created..."));

const refreshAll = async () => {
  await subscriberModel.deleteMany({});
  await subscriberModel.insertMany(data);
  await mongoose.disconnect();
};
refreshAll();
