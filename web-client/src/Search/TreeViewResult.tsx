import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, {
  TreeItemProps,
  useTreeItem,
  TreeItemContentProps,
} from '@mui/lab/TreeItem';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import {RectButton} from "../CommonComponents/ButtonComponents";
import {useState} from "react";
import {SiteInfo} from "../SWRHooks/useAnalyzedData";
import {DetailDialog} from "../Result/MyListView/DetailDialog";


export function TreeViewResult() {
  const [open, setOpen] = React.useState(false);
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);
  const onOpen = () => {setOpen(true)}

  return (
    <>
      <DetailDialog open={open} setOpen={setOpen} siteInfo={siteInfo}/>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon/>}
        defaultExpandIcon={<ChevronRightIcon/>}
        sx={{width: '100%'}}
      >
        <CustomTreeItem nodeId="1" label="xyz.onion/">
          <CustomTreeItem nodeId="2" label="forum1/">
            <CustomTreeItem nodeId="3" label="article1"/>
            <CustomTreeItem nodeId="4" label="article2"/>
            <CustomTreeItem nodeId="5" label="article3"/>
          </CustomTreeItem>
          <CustomTreeItem nodeId="6" label="forum2"/>
          <CustomTreeItem nodeId="7" label="forum3"/>
          <CustomTreeItem nodeId="8" label="forum4"/>
        </CustomTreeItem>
      </TreeView>
    </>
  )
}


const CustomContent = React.forwardRef(function CustomContent(
  props: TreeItemContentProps,
  ref,
) {
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    preventSelection(event);
  };

  const handleExpansionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    handleSelection(event);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      style={{paddingTop: '4px', paddingBottom: '4px'}}
      onMouseDown={handleMouseDown}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div>
      <Typography
        onClick={handleSelectionClick}
        component="div"
        className={classes.label}
      >
        {label}
      </Typography>
      <RectButton sx={{fontSize: '0.7rem', borderRadius: '4px', bgcolor: '#7ea4ca'}}>Detail</RectButton>
    </div>
  );
});

const CustomTreeItem = (props: TreeItemProps) => (
  <TreeItem ContentComponent={CustomContent} {...props} />
);
