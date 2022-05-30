import {FlexColumnBox, FlexRowBox} from "../../CommonComponents/LayoutComponents";
import {Box, Button, Divider, Paper} from "@mui/material";
import {EllipsisTypography, T} from "../../CommonComponents/TextComponent";
import {CategoryTag, LanguageTag, Tag} from "../../CommonComponents/Tag";
import React from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import {SiteInfo} from "../../SWRHooks/useAnalyzedData";

dayjs.locale('ko')

export function MyListItem({row, onClickDetailButton}: { row: SiteInfo, onClickDetailButton: (row: SiteInfo) => void }) {
  function objToTags(obj: { [key: string]: string[] }) {
    return (
      <>
        {Object.entries(obj).filter(([key, value]) => value.length > 0).map(([key, value]) => (
          <Tag key={`${key}`} text={`${key} : ${value.length}`}/>
        ))}
      </>
    )
  }

  return (
    <Paper elevation={3} sx={{p: 1, my: 2}}>
      <FlexRowBox>
        <Box sx={{width: '220px', height: '150px'}}>
          <img
            src={row.image}
            style={{width: '220px', height: '150px'}}
            alt={row.title}
            loading="lazy"
          />
        </Box>
        <Divider orientation="vertical" flexItem sx={{mx: 1}}/>
        <FlexColumnBox sx={{flex: 1, minWidth: 0, height: '100%'}}>
          <EllipsisTypography
            sx={{fontSize: '1.2rem', pr: 3, pb: 1}}><strong>{row.title}</strong>
          </EllipsisTypography>
          <FlexRowBox sx={{alignItems: 'baseline'}}>
            <T sx={{pr: 1}}>url:</T>
            <EllipsisTypography
              sx={{fontSize: '0.8rem', pr: 3, pb: 1}}>{row.url}
            </EllipsisTypography>
          </FlexRowBox>
          <FlexRowBox sx={{alignItems: 'center'}}>
            <FlexRowBox sx={{alignItems: 'baseline', pr: 3}}>
              <strong>사용 언어</strong> :
              <LanguageTag language={row.language}/>
            </FlexRowBox>
            <FlexRowBox sx={{alignItems: 'center', pr: 3}}>
              <strong>분류</strong> :
              <CategoryTag category={row.category}/>
            </FlexRowBox>
            <FlexRowBox sx={{alignItems: 'center', pr: 3}}>
              <strong>트래픽 점수</strong> :
              <T>{row.traffic}</T>
            </FlexRowBox>
          </FlexRowBox>
          <Divider/>
          <FlexRowBox sx={{alignItems: 'center'}}>
            사이트 추적 정보 : {objToTags(row.site_tracking_codes)}
          </FlexRowBox>
          <Divider/>
          <FlexRowBox sx={{alignItems: 'center'}}>
            개인정보 : {objToTags(row.personal_information)}
          </FlexRowBox>
          <Divider/>
          <FlexRowBox sx={{alignItems: 'center'}}>
            기타 : {objToTags(row.others)}
          </FlexRowBox>
          <Divider/>
          <T>검색 시간: {dayjs.unix(parseFloat(row.search_time)).format('YYYY-MM-DD HH:mm:ss')}</T>
        </FlexColumnBox>
        <Button variant='contained' onClick={() => {
          onClickDetailButton(row);
        }}>
          상세보기
        </Button>
      </FlexRowBox>
    </Paper>
  )
}