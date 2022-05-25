import axios from "axios";


export const sessionCheck = async () => {
  return await axios.get('/auth/validation');
}
