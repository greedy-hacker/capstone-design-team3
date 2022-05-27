import axios from "axios";

export const init = () => {
  const accessToken = localStorage.getItem('access-token')
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = accessToken;
  }
  axios.defaults.baseURL = `${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/`;
// axios.defaults.withCredentials = true;
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const {
        config,
        response: {status},
      } = error;
      if (status === 401) {
        if (error.response.data.message === "jwt expired") {
          const originalRequest = config;
          const accessToken = localStorage.getItem('access-token');
          const refreshToken = localStorage.getItem("refresh-token");
          // token refresh 요청
          const {data} = await axios.get(`/auth/token`, {
            headers: {
              'Authorization': accessToken || '',
              'Refresh': refreshToken || '',
              'Content-Type': 'application/json'
            }
          });
          const {accessToken: at, refreshToken: rt} = data.data;
          localStorage.setItem('access-token', at);
          localStorage.setItem('refresh-token', rt);
          axios.defaults.headers.common["Authorization"] = at;
          originalRequest.headers.Authorization =  at;
          // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
          return axios(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );
}