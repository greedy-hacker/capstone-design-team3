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

export const useAnalyzedData = () => {
  const {data, mutate, error} = useSWR(`/results`, fetcher, {suspense: true});
  return {data: plainToInstance(SiteInfo, data as any[]), error, mutate};
}
