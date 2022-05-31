import axios from "axios";

export async function getAllCSV() {
  const {result, error} = await axios
    .get(`/csv`, { responseType: 'blob',})
    .then(result => ({result: result.data, error: undefined})).catch(error => ({error, result: undefined}));
  return {result, error};
}