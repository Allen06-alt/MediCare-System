import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // 🔥 change if needed
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 TOKEN ATTACH (AUTO)
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }

  return req;
});

export default API;