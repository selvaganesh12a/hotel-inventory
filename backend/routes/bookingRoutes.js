const express = require("express");
const Booking = require("../models/Booking"); // Booking Model
const Room = require("../models/room"); // Room Model
const room = require("../models/room");
const router = express.Router();

router.post("/book", async (req, res) => {
  try {
    const { roomId, customerName, checkInDate, checkOutDate } = req.body;

    // Check if room is available
    //console.log(roomId);
    const room = await Room.findById(roomId);
    //console.log(room);

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    if (room.status === "Available") {
      const newBooking = new Booking({
        roomId,
        customerName,
        checkInDate,
        checkOutDate,
        roomNumber: room.roomNumber,
      });

      await newBooking.save();

      // Mark room as unavailable
      room.status = "Booked";
      await room.save();

      // Ensure this is the only response
      return res
        .status(201)
        .json({ message: "Booking successful", booking: newBooking });
    }

    // This only runs if room is NOT available
    return res
      .status(400)
      .json({ message: "Room is not available for booking" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("roomId"); // Populate room details
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({
      message: "Booking updated successfully!",
      booking: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/cancel/:bookingId/:roomId", async (req, res) => {
  try {
    const { bookingId, roomId } = req.params;

    if (!roomId || roomId === "null") {
      return res.status(400).json({ error: "Invalid room ID" });
    }

    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if(!deletedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    
    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { status: "Available" },
      { new: true }
    );
    console.log("Updated Room Status:", updatedRoom.status);
    if(!updatedRoom) {
      return res.status(404).json({ error: "Room not found" });
    }

    res.json({ message: "Booking cancelled successfully!", room: updatedRoom });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
