import axios from "axios";

const baseURL = import.meta.env.DEV
  ? "http://localhost:5000/api"
  : "https://bourbon-and-blade-3000cca3a2fe.herokuapp.com/api";

const apiClient = axios.create({
  baseURL,
  timeout: 10000,
});

const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
};

const getContent = async () => {
  const response = await apiClient.get("/content");
  return response.data;
};

const createBooking = async (payload) => {
  const response = await apiClient.post("/bookings", payload);
  return response.data;
};

const submitFeedback = async (payload) => {
  const response = await apiClient.post("/feedback", payload);
  return response.data;
};

const joinLoyalty = async (payload) => {
  const response = await apiClient.post("/loyalty", payload);
  return response.data;
};

export {
  apiClient,
  setAuthToken,
  getContent,
  createBooking,
  submitFeedback,
  joinLoyalty,
};
