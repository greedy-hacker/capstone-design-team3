import axios from "axios";

export const init = () => {
  axios.defaults.headers.common["Authorization"] = localStorage.getItem('access-token') || '';
  axios.defaults.baseURL = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/`;
// axios.defaults.withCredentials = true;
}