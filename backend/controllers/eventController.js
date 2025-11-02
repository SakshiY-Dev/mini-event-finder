const { events } = require("../data/eventData");
// Create a new event

const createEvent = (req, res) => {
  const {
    title,
    description,
    location,
    date,
    maxParticipants,
    currentParticipants = 0,
  } = req.body;

  if (!title || !description || !location || !date || !maxParticipants) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newEvent = {
    id: events.length + 1,
    title,
    description,
    location,
    date,
    maxParticipants,
    currentParticipants,
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
};
const getAllEvents = (req, res) => {
  const { location } = req.query;

  if (location) {
    const filteredEvents = events.filter((event) =>
      event.location.toLowerCase().includes(location.toLowerCase())
    );
    return res.json(filteredEvents);
  }

  res.json(events);
};
// Get event by ID
const getEventById = (req, res) => {
  const id = parseInt(req.params.id);
  const event = events.find((e) => e.id === id);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  res.json(event);
};

const joinEvent = (req, res) => {
  const id = parseInt(req.params.id);
  const event = events.find((e) => e.id === id);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  if (event.currentParticipants >= event.maxParticipants) {
    return res.status(400).json({ message: "Event is already full" });
  }

  event.currentParticipants += 1;

  res.status(200).json({
    message: "Successfully joined event",
    event,
  });
};

module.exports = { createEvent, getAllEvents, getEventById, joinEvent };
