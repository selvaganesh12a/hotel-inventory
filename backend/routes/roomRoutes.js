const express = require("express");
const Room = require("../models/room");

const router = express.Router();

// Create a Room
router.post("/add", async (req, res) => {
  try {
    const rooms = await Room.insertMany(req.body);
    await newRoom.save();
    res
      .status(201)
      .json({ message: "Room added successfully!", room: newRoom });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all Rooms
router.get("/all", async (req, res) => {
  try {
    const rooms = await Room.find({status: "Available"});
    console.log("Rooms from DB ",rooms);
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Room Status
router.put("/update/:id", async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: "Room updated successfully!", room: updatedRoom });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a Room
router.delete("/delete/:id", async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: "Room deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/rooms/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;