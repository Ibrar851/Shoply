// src/utils/auth.js
export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role || null;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
