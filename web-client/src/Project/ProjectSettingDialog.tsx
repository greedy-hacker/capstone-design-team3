import React from "react";
import {DialogContainer} from "../CommonComponents/DialogContainer";
import {RectButton} from "../CommonComponents/ButtonComponents";
import {Container, Tab, Tabs} from "@mui/material";
import {BaseInfo} from "./ProjectSetting/BaseInfo";
import {MonitoringURLSetting} from "./ProjectSetting/MonitoringURLSetting";
import {KeywordSetting} from "./ProjectSetting/KeywordSetting";

export function ProjectSettingDialog(props: { open: boolean, setOpen: any }) {
  const {open, setOpen} = props;
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (e: any, newValue: React.SetStateAction<number>) => {
    setTab(newValue);
  };

  let component;

  switch (tab) {
    case 0:
      component = <BaseInfo/>;
      break;
    case 1:
      component = <MonitoringURLSetting/>;
      break;
    case 2:
      component = <KeywordSetting/>;
      break;
  }

  return (
    <DialogContainer open={open} onClose={() => setOpen(false)} title='프로젝트 설정' buttons={null}
                     maxWidth='sm'>
      <Container>
        <Tabs
          value={tab}
          onChange={handleTabChange}
        >
          <Tab label="기본설정"/>
          <Tab label="모니터링 URL 설정"/>
          <Tab label="키워드 설정"/>
        </Tabs>
        {component}
      </Container>
    </DialogContainer>
  )
}