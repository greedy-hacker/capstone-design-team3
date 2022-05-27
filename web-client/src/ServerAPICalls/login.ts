import axios from "axios";

export async function login(userEmail: string, userPw: string) {
  const {result, error} = await axios
    .post('/auth/login', {userEmail, userPw})
    .then(result => ({result, error: undefined})).catch(error => ({error, result: undefined}));
  if (result) {
    const {accessToken, refreshToken} = result.data.data;
    localStorage.setItem('access-token', accessToken);
    localStorage.setItem('refresh-token', refreshToken);
    axios.defaults.headers.common["Authorization"] = accessToken;
  }
  return {result, error};
}