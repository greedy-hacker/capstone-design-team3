import axios from "axios";

export async function addMonitoringUrl(projectId: string, url: string) {
  const {result, error} = await axios
    .post(`/project/${projectId}/url`, {url})
    .then(result => ({result, error: undefined})).catch(error => ({error, result: undefined}));
  return {result, error};
}

export async function deleteMonitoringUrl(projectId: string, url: string) {
  const {result, error} = await axios
    .delete(`/project/${projectId}/url`, {data:{url}})
    .then(result => ({result, error: undefined})).catch(error => ({error, result: undefined}));
  return {result, error};
}

export async function updateMonitoringUrl(projectId: string, oldUrl: string, newUrl: string) {
  const {result, error} = await axios
    .patch(`/project/${projectId}/url`, {oldUrl, newUrl})
    .then(result => ({result, error: undefined})).catch(error => ({error, result: undefined}));
  return {result, error};
}
