import useSWR from "swr";
import {fetcher} from "./fetcher";
import {plainToInstance} from "class-transformer";
import {Project} from "./useProjects";


export const useProjectBaseInfo = (projectId: string) => {
  const {data, mutate, error} = useSWR(`/project/${projectId}`, fetcher);
  let project = undefined
  if (data)
    project = plainToInstance(Project, data);
  return {project, error, mutate};
}
