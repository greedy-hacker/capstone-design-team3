import {MenuItem, TextField} from "@mui/material";
import {FlexColumnBox, FlexRowBox} from "../../CommonComponents/LayoutComponents";
import {T} from "../../CommonComponents/TextComponent";
import {ResultOptions} from "../Result";
import {LanguageCount} from "../../SWRHooks/useLanguageCount";

const categories = ['unknown', 'adult', 'hacking', 'drug', 'gambling', 'weapon', 'violence', 'counterfeit']
const sortby = [
  {key: 'traffic', label: '트래픽 빈도'},
  {key: 'search_time', label: '검색 시간'},
  {key: 'title', label: '제목'},
];

export function SubMenu({setResultOptions, resultOptions, languageCount}: { setResultOptions: any, resultOptions: ResultOptions, languageCount: LanguageCount[] }) {
  return (
    <FlexColumnBox>
      <FlexRowBox sx={{alignItems: 'center', justifyContent: 'space-between'}}>
        <T sx={{pr: 3}}>언어</T>
        <TextField size='small' sx={{width: '150px'}} label='언어 선택' select value={resultOptions.lang} onChange={(e) => {
          let value: string | undefined = e.target.value;
          if (value === 'all') value = ''
          setResultOptions((prev: any) => ({
            ...prev,
            lang: value
          }))
        }}>
          <MenuItem value='all'>ALL</MenuItem>
          {languageCount.map((l) => (<MenuItem key={l.language} value={l.language}>{l.language}</MenuItem>))}
        </TextField>
        <T sx={{pl: 5, pr: 3}}>카테고리</T>
        <TextField size='small' sx={{width: '150px'}} label='카테고리 선택' select value={resultOptions.category} onChange={(e) => {
          let value: string | undefined = e.target.value;
          if (value === 'all') value = ''
          setResultOptions((prev: any) => ({
            ...prev,
            category: value
          }))
        }}>
          <MenuItem value='all'>ALL</MenuItem>
          {categories.map((l) => (<MenuItem key={l} value={l}>{l}</MenuItem>))}
        </TextField>
        <T sx={{pl: 5, pr: 3}}>정렬기준</T>
        <TextField size='small' sx={{width: '150px'}} label='정렬기준 선택' select value={resultOptions.sortby} onChange={(e) => {
          setResultOptions((prev: any) => ({
            ...prev,
            sortby: e.target.value
          }))
        }}>
          {sortby.map(({key, label}) => (<MenuItem key={key} value={key}>{label}</MenuItem>))}
        </TextField>
        <T sx={{pl: 5, pr: 3}}>정렬방식</T>
        <TextField size='small' sx={{width: '150px'}} label='정렬방식' select value={resultOptions.order} onChange={(e) => {
          setResultOptions((prev: any) => ({
            ...prev,
            order: e.target.value
          }))
        }}>
          <MenuItem value='desc'>내림차순</MenuItem>
          <MenuItem value='asc'>오름차순</MenuItem>
        </TextField>
      </FlexRowBox>
    </FlexColumnBox>
  )
}