import axios from "axios";

export async function register(userName: string, userEmail: string, userPw: string) {
  const {result, error} = await axios
    .post('/auth/signup', {userName, userEmail, userPw})
    .then(result => ({result, error: undefined})).catch(error => ({error, result: undefined}));
  return {result, error};
}