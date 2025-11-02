const API_BASE_URL = "http://localhost:3000/api/events";

export const getAllEvents = async () => {
  const response = await fetch(`${API_BASE_URL}`);
  return response.json();
};

export const createEvent = async (eventData) => {
  const response = await fetch(`${API_BASE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
  return response.json();
};

export const getEventById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  return response.json();
};

export const joinEvent = async (id) => {
  const res = await fetch(`${API_BASE_URL}/${id}/join`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Failed to join event");
  return res.json();
};
