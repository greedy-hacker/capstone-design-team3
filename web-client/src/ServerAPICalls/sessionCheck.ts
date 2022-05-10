import axios from "axios";


export const sessionCheck = async () => {
  const result = await axios.get('/auth/check');
  return result;
}
