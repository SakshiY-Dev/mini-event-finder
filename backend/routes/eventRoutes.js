const express = require("express");
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  getEventById,
  joinEvent,
} = require("../controllers/eventController");

router.post("/", createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.patch("/:id/join", joinEvent);

module.exports = router;
