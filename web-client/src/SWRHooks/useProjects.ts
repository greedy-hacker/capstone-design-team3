import useSWR from "swr";
import {fetcher} from "./fetcher";
import {plainToInstance} from "class-transformer";

export class Project {
  id!: number;
  projectName!: string;
  description!: string;
  targetDomain!: string;
  user_id!: number;
}

export const useProjects = () => {
  const {data, mutate, error} = useSWR(`/project/list?paged=1`, fetcher);
  let projects = undefined
  if (data)
    projects = plainToInstance(Project, data as any[]);
  return {projects, error, mutate};
}
