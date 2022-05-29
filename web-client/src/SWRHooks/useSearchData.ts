import useSWR from "swr";
import {fetcher} from "./fetcher";


export const useSearchData = () => {
  let {data, mutate, error} = useSWR(`/analysis`, fetcher);

  if (data) {
    if (data === '분석이 시작되었습니다. 잠시 기다려주세요.')
      data = {status: 'PENDING', message: data}
    else if (data === '아직 분석이 시작되지 않았습니다.')
      data = {status: 'READY', message: data}
    else if (data?.status === true) {
      data.status = 'SUCCESS'
      data.message = '분석이 완료되었습니다.'
    }
    else if (data?.status === false) {
      data.status = 'FAIL'
      data.message = '요청한 URL이 응답하지 않습니다.'
    }

  }
  return {data, error, mutate};
}
