import axios from 'axios';

export const fetcher = (url: string) =>
  axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });