import useSWR from "swr";
import {fetcher} from "./fetcher";
import {plainToInstance} from "class-transformer";

export class LanguageCount {
  language!: string;
  count!: number;
}

export const useLanguageCount = () => {
  const {data, mutate, error} = useSWR(`/results/number/language`, fetcher);
  return {languageCount: data && plainToInstance(LanguageCount, data as any[]), error, mutate};
}
