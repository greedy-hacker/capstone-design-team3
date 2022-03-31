import {Chip} from "@mui/material";


const categoryColors:any = {
  adult: 'red',
  drug: 'violet',
  gambling: 'green',
  weapon: 'blue',
  murder: 'white'
}

const languageColors:any = {
  en: 'red',
  ko: 'orange',
  ja: 'green',
  fr: 'blue',
  ru: 'black'
}

export function CategoryTag(props: { category: string}) {
  return (
    <Chip
      sx={{m: 0.4, borderRadius: '4px', }}
      label={props.category || 'none'}
    />
  )
}

export function LanguageTag(props: { language: string}) {
  return (
    <Chip
      sx={{m: 0.4,  borderRadius: '4px', }}
      label={props.language || 'none'}
    />
  )
}
export function Tag(props: { text: string}) {
  return (
    <Chip
      size='small'
      sx={{m: 0.4,  borderRadius: '4px', }}
      label={props.text}
    />
  )
}