import http from "./httpService";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

http.setAuthHeader(getJwT());

async function login(user) {
  const data = {
    email: user.username,
    password: user.password,
  };

  const { data: jwt } = await http.post("http://localhost:8000/api/auth", data);
  localStorage.setItem(tokenKey, jwt);
}

function loginWithJwT(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getJwT() {
  return localStorage.getItem(tokenKey);
}

function getCurrentUser() {
  try {
    const token = getJwT();
    const user = jwtDecode(token);
    return user;
  } catch (error) {
    return null;
  }
}

export default {
  login,
  loginWithJwT,
  logout,
  getJwT,
  getCurrentUser,
};
