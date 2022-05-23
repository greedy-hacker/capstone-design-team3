import axios from "axios";

export function logout() {
  localStorage.setItem('access-token', '');
  localStorage.setItem('refresh-token', '');
  axios.defaults.headers.common["Authorization"] = '';
}