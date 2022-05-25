import useSWR from "swr";
import {fetcher} from "./fetcher";
import {plainToInstance} from "class-transformer";

export class CountInfo {
  category!: string;
  count!: number;
}

export const useCount = () => {
  const {data, mutate, error} = useSWR(`/results/number`, fetcher);
  return {count: data && plainToInstance(CountInfo, data as any[]), error, mutate};
}
