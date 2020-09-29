const express = require("express");

const bodyParser = require("body-parser");
// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 19005;
const cors = require("cors");

const allowCrossDomain = function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://192.168.1.6:19000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PROPFIND, PROPPATCH, COPY, MOVE, DELETE, MKCOL, LOCK, UNLOCK, PUT, GETLIB, VERSION-CONTROL, CHECKIN, CHECKOUT, UNCHECKOUT, REPORT, UPDATE, CANCELUPLOAD, HEAD, OPTIONS, GET, POST"
  );
  res.setHeader("Access-Control-Allow-Headers", "origin, content-type, accept");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
};
app.use(allowCrossDomain);
app.use(cors({ origin: "http://localhost:19006" }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json

// Configuring the database
const dbConfig = require("./config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database.", err);
    process.exit();
  });

// Require Users routes
const userRoutes = require("./src/routes/user.routes");
const hotelRoutes = require("./src/routes/hotel.routes");
// using as middleware
app.use("/api/users", userRoutes);
app.use("/api/hotels", hotelRoutes);
// define a root/default route
app.get("/", (req, res) => {
  res.json({ message: "Success connected to server" });
});
// listen for requests
app.listen(port, () => {
  console.log(`Node server is listening on port ${port}`);
});
