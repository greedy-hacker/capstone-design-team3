import axios from "axios";

export function logout() {
  localStorage.setItem('access-token', '');
  axios.defaults.headers.common["Authorization"] = '';
}