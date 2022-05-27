import useSWR from "swr";
import {fetcher} from "./fetcher";
import {plainToInstance, Transform} from "class-transformer";

export class SiteInfo {
  id!: number;
  url!: string
  title!: string;
  language!: string;
  category!: string;
  reference_url!: string;
  @Transform(({value}) => {return JSON.parse(value.replace(/'/g, '"'))})
  site_tracking_codes!: { [key: string]: string[] };
  @Transform(({value}) => {return JSON.parse(value.replace(/'/g, '"'))})
  personal_information!: { [key: string]: string[] };
  @Transform(({value}) => {return JSON.parse(value.replace(/'/g, '"'))})
  others!: { [key: string]: string[] };
}

export const useAnalyzedData = (options?: { paged?: number, sortby?: string, order?: string, lang?: string, category?: string, title?: string, url?: string }) => {
  let query = `?paged=${options?.paged || '1'}&sortby=${options?.sortby || 'id'}&order=${options?.order || 'desc'}`
  if (options?.lang)
    query += `&lang=${options.lang}`
  if (options?.category)
    query += `&category=${options.category}`
  if (options?.title)
    query += `&title=${options.title}`
  if (options?.url)
    query += `&url=${options.url}`

  const {data, mutate, error} = useSWR(`/results${query}`, fetcher, {suspense: true});

  return {data: plainToInstance(SiteInfo, data as any[]), error, mutate};
}
