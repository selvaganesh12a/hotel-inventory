const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomNumber: { type: Number, required: true, unique: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Available", "Booked", "Maintenance"],
    default: "Available",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Room", RoomSchema);
