const mongoose = require("mongoose");

const HotelSchema = mongoose.Schema({
  id: Number,

  nameHotel: String,

  mainImage: String,

  discribe: String,

  Rooms: [
    {
      id: Number,

      number: Number,

      nameRoom: String,

      price: Number,

      booked: Boolean,

      image: String,
    },
  ],
});

module.exports = mongoose.model("Hotel", HotelSchema);
