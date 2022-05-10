import {Button, ButtonGroup} from "@mui/material";
import {FlexRowBox} from "../../CommonComponents/LayoutComponents";
import {T} from "../../CommonComponents/TextComponent";

const languages = ['en', 'ko', 'fr', 'ru', 'ja']
const categories = ['all', 'unknown', 'adult', 'drug', 'gambling', 'weapon', 'murder', 'info-leak']

export function SubMenu() {
  return (
    <>
      <FlexRowBox sx={{alignItems: 'center'}}>
        <T sx={{pr: 3}}>언어 설정 : </T>
        <ButtonGroup variant="contained">
          {languages.map(l => <Button key={l}>{l}</Button>)}
        </ButtonGroup>
      </FlexRowBox>
      <FlexRowBox sx={{alignItems: 'center', mt: 3}}>
        <T sx={{pr: 3}}>카테고리 설정 : </T>
        <ButtonGroup variant="contained">
          {categories.map(c => <Button key={c}>{c}</Button>)}
        </ButtonGroup>
      </FlexRowBox>
    </>
  )
}