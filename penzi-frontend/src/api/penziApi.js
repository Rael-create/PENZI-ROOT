import axios from "axios";

// Create axios instance
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 8000,
});

/**
 * Send an SMS message to the Penzi backend.
 */
export const sendSms = async (phone_number, message) => {
  const response = await api.post("/penzi", {
    phone_number,
    message,
  });
  return response.data;
};

/**
 * Fetch dashboard statistics from the backend.
 */
export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats");
  return response.data;
};

/**
 * Check if a phone number is already registered.
 */
export const checkRegistration = async (phone_number) => {
  const response = await api.get(
    `/check-registration/${phone_number}`
  );
  return response.data;
};

export default api;