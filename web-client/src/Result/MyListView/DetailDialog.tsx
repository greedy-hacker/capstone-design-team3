import {SiteInfo} from "../../SWRHooks/useAnalyzedData";
import {DialogContainer} from "../../CommonComponents/DialogContainer";
import {Box, Switch, Table, TableBody, TableCell, TableContainer, TableRow, TextField} from "@mui/material";
import {T} from "../../CommonComponents/TextComponent";
import React from "react";
import {FlexRowBox} from "../../CommonComponents/LayoutComponents";

const beautify_html = require('js-beautify').html;

export function DetailDialog({open, setOpen, siteInfo}: { open: boolean, setOpen: any, siteInfo: SiteInfo | null }) {

  const [imageChecked, setImageChecked] = React.useState(false);
  const [htmlChecked, setHtmlChecked] = React.useState(false);

  return (
    <DialogContainer open={open} onClose={() => setOpen(false)} title='사이트 분석정보' buttons={null} maxWidth='md'>
      {
        siteInfo &&
        <TableContainer component={Box}>
          <FlexRowBox sx={{alignItems: 'baseline'}}>
            <T sx={{mr: 2}}>스크린샷 보이기</T>
            <Switch
              sx={{mr: 3}}
              checked={imageChecked}
              onChange={(e: any) => setImageChecked(e.target.checked)}
            />
            <T sx={{mr: 2}}>HTML 보이기</T>
            <Switch
              sx={{mr: 3}}
              checked={htmlChecked}
              onChange={(e: any) => setHtmlChecked(e.target.checked)}
            />
          </FlexRowBox>
          {
            imageChecked && <img
              src={`${siteInfo.image}`}
              style={{width: '100%'}}
              alt={siteInfo.title}
              loading="lazy"
            />
          }
          {
            htmlChecked && <TextField multiline fullWidth value={`${beautify_html(siteInfo.html, {
              "indent_size": "2",
              "indent_char": " ",
              "max_preserve_newlines": "5",
              "preserve_newlines": true,
              "keep_array_indentation": false,
              "break_chained_methods": false,
              "indent_scripts": "normal",
              "brace_style": "collapse",
              "space_before_conditional": true,
              "unescape_strings": false,
              "jslint_happy": false,
              "end_with_newline": false,
              "wrap_line_length": "0",
              "indent_inner_html": false,
              "comma_first": false,
              "e4x": false,
              "indent_empty_lines": false
            })}`} />
          }
          <T variant='h6' sx={{mt: 2}}>기본정보</T>
          <Table
            sx={{
              '& td, & th': {
                border: '1px solid black',
                boxSizing: 'border-box',
                textAlign: 'center',
                fontWeight: 'bold',
              },
            }}
          >
            <TableBody>
              <TableRow>
                <TableCell width='150px'>URL</TableCell>
                <TableCell>{siteInfo!.url}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>{siteInfo!.title}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>언어</TableCell>
                <TableCell>{siteInfo!.language}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>카테고리</TableCell>
                <TableCell>{siteInfo!.category}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>트래픽 점수</TableCell>
                <TableCell>{siteInfo!.traffic}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <T variant='h6' sx={{pt: 2}}>추가정보</T>
          <Box sx={{mt: 2, mb: 1}}>
            <T variant='h7'>사이트 추적 정보</T>
          </Box>
          <Table
            sx={{
              '& td, & th': {
                border: '1px solid black',
                boxSizing: 'border-box',
                textAlign: 'center',
              },
            }}>
            <TableBody>
              {Object.entries(siteInfo.site_tracking_codes).map(([key, arr]) => (
                <TableRow key={key}>
                  <TableCell width='200px'>
                    {key}
                  </TableCell>
                  <TableCell>
                    {arr.length ? <ul style={{textAlign: "start"}}>{arr.map(v => <li>{v}</li>)}</ul> : 'Not Found'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{mt: 2, mb: 1}}>
            <T variant='h7'>개인 정보</T>
          </Box>
          <Table
            sx={{
              '& td, & th': {
                border: '1px solid black',
                boxSizing: 'border-box',
                textAlign: 'center',
              },
            }}>
            <TableBody>
              {Object.entries(siteInfo.personal_information).map(([key, arr]) => (
                <TableRow key={key}>
                  <TableCell width='200px'>
                    {key}
                  </TableCell>
                  <TableCell>
                    {arr.length ? <ul style={{textAlign: "start"}}>{arr.map(v => <li>{v}</li>)}</ul> : 'Not Found'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{mt: 2, mb: 1}}>
            <T variant='h7'>기타 정보</T>
          </Box>
          <Table
            sx={{
              '& td, & th': {
                border: '1px solid black',
                boxSizing: 'border-box',
                textAlign: 'center',
              },
            }}>
            <TableBody>
              {Object.entries(siteInfo.others).map(([key, arr]) => (
                <TableRow key={key}>
                  <TableCell width='200px'>
                    {key}
                  </TableCell>
                  <TableCell>
                    {arr.length ? <ul style={{textAlign: "start"}}>{arr.map(v => <li>{v}</li>)}</ul> : 'Not Found'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }

    </DialogContainer>
  )
}