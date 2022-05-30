import useSWR from "swr";
import {fetcher} from "./fetcher";
import {plainToInstance} from "class-transformer";

export class CategoryCount {
  category!: string;
  count!: number;
}

export const useCategoryCount = () => {
  const {data, mutate, error} = useSWR(`/results/number/category`, fetcher);
  return {categoryCount: data && plainToInstance(CategoryCount, data as any[]), error, mutate};
}
