import axios from "axios";

const API_URL = "https://gestion-taches-61ze.onrender.com/";

export const register = (email, password) =>
  axios.post(`${API_URL}auth/register`, { email, password });

export const login = (email, password) =>
  axios.post(`${API_URL}auth/login`, { email, password });

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};
