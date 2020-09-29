const Hotel = require("../models/hotel.model.js");
const User = require("../models/user.model.js");
exports.findAll = (req, res) => {
  Hotel.find()
    .then((hotels) => {
      res.send(hotels);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something went wrong while getting list of hotels.",
      });
    });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field",
    });
  }
  // Create a new Hotel
  const hotel = new Hotel({
    id: req.body.id,
    nameHotel: req.body.nameHotel,
    mainImage: req.body.mainImage,
    discribe: req.body.discribe,
    Rooms: req.body.Rooms,
  });
  // Save user in the database
  hotel
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong while creating new user.",
      });
    });
};

exports.booked = async (req, res) => {
  console.log(req.body);
  await Hotel.findOneAndUpdate(
    {
      id: req.body.id_Hotel,
      "Rooms.id": req.body.id_Room,
    },
    {
      $set: { "Rooms.$.booked": "true" },
    }
  );
  const user = await User.findOne({ login: req.body.login });
  const room = await Hotel.findOne({
    id: req.body.id_Hotel,
  });

  const newBalance = user.balance - room.Rooms[req.body.id_Room - 1].price;
  await User.findOneAndUpdate(
    { login: req.body.login },
    { balance: newBalance }
  );
};
