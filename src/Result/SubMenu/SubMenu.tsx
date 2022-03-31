import {Button, ButtonGroup} from "@mui/material";
import {FlexRowBox} from "../../SubComponents/LayoutComponents";
import {T} from "../../SubComponents/TextComponent";

const languages = ['en', 'ko', 'fr', 'ru', 'ja']
const categories = ['all', 'unknown', 'adult', 'drug', 'gambling', 'weapon', 'murder', 'counterfeit']

export function SubMenu() {
  return (
    <>
      <FlexRowBox sx={{alignItems: 'center'}}>
        <T sx={{pr: 3}}>Language Filtering : </T>
        <ButtonGroup variant="contained">
          {languages.map(l => <Button key={l}>{l}</Button>)}
        </ButtonGroup>
      </FlexRowBox>
      <FlexRowBox sx={{alignItems: 'center', mt: 3}}>
        <T sx={{pr: 3}}>Category Filtering : </T>
        <ButtonGroup variant="contained">
          {categories.map(c => <Button key={c}>{c}</Button>)}
        </ButtonGroup>
      </FlexRowBox>
    </>
  )
}