import axios from "axios";

export async function requestDomainAnalysis(domain: string) {
  const {result, error} = await axios
    .post('/analysis', {domain})
    .then(result => ({result, error: undefined})).catch(error => ({error, result: undefined}));
  return {result, error};
}

export async function getDomainAnalysisResult() {
  const {result, error} = await axios
    .get('/analysis')
    .then(result => ({result, error: undefined})).catch(error => ({error, result: undefined}));
  return {result, error};
}