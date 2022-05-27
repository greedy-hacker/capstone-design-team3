import axios from "axios";

export async function addKeyword(projectId: string, keyword: string) {
  const {result, error} = await axios
    .post(`/project/${projectId}/keyword`, {keyword})
    .then(result => ({result, error: undefined})).catch(error => ({error, result: undefined}));
  return {result, error};
}

export async function deleteKeyword(projectId: string, keyword: string) {
  const {result, error} = await axios
    .delete(`/project/${projectId}/keyword`, {data:{keyword}})
    .then(result => ({result, error: undefined})).catch(error => ({error, result: undefined}));
  return {result, error};
}

export async function updateKeyword(projectId: string, oldKeyword: string, newKeyword: string) {
  const {result, error} = await axios
    .patch(`/project/${projectId}/keyword`, {oldKeyword, newKeyword})
    .then(result => ({result, error: undefined})).catch(error => ({error, result: undefined}));
  return {result, error};
}
