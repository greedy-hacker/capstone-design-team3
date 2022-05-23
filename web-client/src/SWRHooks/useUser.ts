import useSWR from "swr";
import {fetcher} from "./fetcher";
import {plainToInstance} from "class-transformer";

export class User {
  Projects!: any[];
  id!: number;
  userName!: string;
  userEmail!: string;
  realTimeStatus!: string;
  realTimeResult!: string;
}

export const useUser = (option?: {suspense: boolean}) => {
  const enabledSuspense = !option || option.suspense;
  const {data, mutate, error} = useSWR(`/auth`, fetcher, {suspense: enabledSuspense});
  return {user: data && plainToInstance(User, data), error, mutate};
}
