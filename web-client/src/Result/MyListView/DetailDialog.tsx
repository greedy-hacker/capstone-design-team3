import {SiteInfo} from "../../SWRHooks/useAnalyzedData";
import {DialogContainer} from "../../CommonComponents/DialogContainer";
import {Box, Button, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {T} from "../../CommonComponents/TextComponent";
import React from "react";

export function DetailDialog({open, setOpen, siteInfo}:{open:boolean, setOpen:any, siteInfo:SiteInfo | null}) {
  return (
    <DialogContainer open={open} onClose={() => setOpen(false)} title='사이트 분석정보' buttons={null} maxWidth='md'>
      {
        siteInfo && <TableContainer component={Box}>
          <Button variant='contained' sx={{mr: 2}}>스크린샷</Button>
          <Button variant='contained' sx={{mr: 2}}>HTML</Button>
          <Button variant='contained'>출력</Button>
          <T variant='h6' sx={{mt:2}}>기본정보</T>
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
                <TableCell width='100px'>Tor URL</TableCell>
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
                  <TableCell >
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