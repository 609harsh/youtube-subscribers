require("dotenv").config();
const express = require("express");
const app = require("./app.js");
const mongoose = require("mongoose");

const port = process.env.PORT;
const database_url = process.env.DATABASE_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(database_url);
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => {
  console.log("connected to database");
  //Server Start
  app.listen(port, () => console.log(`App listening on port ${port}!`));
});
