import useSWR from "swr";
import {fetcher} from "./fetcher";
import {plainToInstance} from "class-transformer";

export class urlSetting {
  url!: string;
}

export const useProjectUrlSetting = (projectId: string) => {
  const {data, mutate, error} = useSWR(`/project/${projectId}/url`, fetcher);
  let urls: urlSetting[] | undefined = undefined
  if (data)
    urls = plainToInstance(urlSetting, data as any[]);
  return {urls, error, mutate};
}
