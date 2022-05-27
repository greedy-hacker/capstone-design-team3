import useSWR from "swr";
import {fetcher} from "./fetcher";
import {plainToInstance} from "class-transformer";

export class keywordSetting {
  keyword!: string;
}

export const useProjectKeywordSetting = (projectId: string) => {
  const {data, mutate, error} = useSWR(`/project/${projectId}/keyword`, fetcher);
  let keywords: keywordSetting[] | undefined = undefined
  if (data)
    keywords = plainToInstance(keywordSetting, data as any[]);
  return {keywords, error, mutate};
}
