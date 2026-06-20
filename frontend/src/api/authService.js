import API from "../../api/api";

// 🔥 REGISTER
export const registerUser = async (data) => {
  const res = await API.post("/api/auth/register", data);
  return res.data;
};

// 🔥 LOGIN
export const loginUser = async (data) => {
  const res = await API.post("/api/auth/login", data);
  return res.data;
};

// 🔥 LOGOUT
export const logoutUser = () => {
  localStorage.removeItem("user");
};