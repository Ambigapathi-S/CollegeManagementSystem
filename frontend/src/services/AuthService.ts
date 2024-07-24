import axios from "axios";

const AUTH_REST_API_URL = "http://localhost:8080/api/auth";

export const LoginApi = (email: string, password: string) =>
  axios.post(AUTH_REST_API_URL + "/login", { email, password });


export const saveLoggedInUser = (username: string, role: string) => {
  localStorage.setItem("authenticatedUser", username);
  localStorage.setItem("role", role);
};


export const isAdminUser = () => {
  const role = localStorage.getItem("role");

  if (role != null && role === "ROLE_ADMIN") {
    return true;
  } else {
    return false;
  }
};


export const isUserLoggedIn = () => {
  const username = localStorage.getItem("authenticatedUser");
  if (username == null) {
    return false;
  } else {
    return true;
  }
};

export const getLoggedInUser = () => {
  return localStorage.getItem("authenticatedUser");
};

export const logout = () => {
  localStorage.clear();
};






