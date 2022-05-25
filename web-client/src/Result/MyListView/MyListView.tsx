import React, {useState} from "react";
import {SiteInfo, useAnalyzedData} from "../../SWRHooks/useAnalyzedData";
import {DetailDialog} from "./DetailDialog";
import {MyListItem} from "./MyListItem";
import {ResultOptions} from "../Result";

export function MyListView({resultOptions}: {resultOptions: ResultOptions}) {
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);
  const {data} = useAnalyzedData(resultOptions);

  const [open, setOpen] = React.useState(false);

  const onClickDetailButton = (row: SiteInfo) => {
    setSiteInfo(row);
    setOpen(true);
  }

  return (
    <>
      <DetailDialog open={open} setOpen={setOpen} siteInfo={siteInfo}/>
      {
        data.map(row => (<MyListItem row={row} onClickDetailButton={onClickDetailButton}/>))
      }
    </>
  )
}
