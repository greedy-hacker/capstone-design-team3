import axios from "axios";
export const init = () => {
  axios.defaults.baseURL = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/`;
// axios.defaults.withCredentials = true;
}