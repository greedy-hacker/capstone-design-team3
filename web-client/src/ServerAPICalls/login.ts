import axios from "axios";

export async function login(userEmail: string, userPw: string) {
  const {result, error} = await axios
    .post('/auth/login', {userEmail, userPw})
    .then(result => ({result, error: undefined})).catch(error => ({error, result: undefined}));
  if (result) {
    localStorage.setItem('access-token', result.data.token);
    axios.defaults.headers.common["Authorization"] = result.data.token;
  }
  console.log(result, error);
  return {result, error};
}