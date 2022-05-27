import axios from "axios";


export interface ProjectForm {
  projectName: string;
  targetDomain: string;
  description: string;
}

export async function addProject(projectForm: ProjectForm) {
  const {result, error} = await axios
    .post('/project', projectForm)
    .then(result => ({result, error: undefined})).catch(error => ({error, result: undefined}));
  return {result, error};
}

export async function updateProjectBaseInfo(projectId: string, baseInfo:ProjectForm) {
  const {result, error} = await axios
    .patch(`/project/${projectId}`, baseInfo)
    .then(result => ({result, error: undefined})).catch(error => ({error, result: undefined}));
  return {result, error};
}