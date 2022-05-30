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
import {PageNode} from "./SearchResult";


export function TreeViewResult({root}: { root: PageNode }) {
  const [open, setOpen] = React.useState(false);
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);

  const handleClickDetail = (siteInfo: SiteInfo) => {
    setSiteInfo(siteInfo);
    setOpen(true);
  }

  const renderTree = (node: PageNode) => (
    <CustomTreeItem key={node.path} nodeId={node.path} siteInfo={node.data} path={node.path}
                    handleClickDetail={handleClickDetail}>
      {node.children.map((node) => renderTree(node))}
    </CustomTreeItem>
  )
  return (
    <>
      <DetailDialog open={open} setOpen={setOpen} siteInfo={siteInfo}/>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon/>}
        defaultExpandIcon={<ChevronRightIcon/>}
        sx={{width: '100%'}}
      >
        {root.children.map((node) => renderTree(node))}
      </TreeView>
    </>
  )
}


const CustomContent = React.forwardRef(function CustomContent(
  props: TreeItemContentProps & {
    siteInfo: SiteInfo | null;
    handleClickDetail: any;
    path: string
  },
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
    siteInfo,
    handleClickDetail,
    path
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
        {path}
      </Typography>
      {siteInfo && <RectButton sx={{fontSize: '0.7rem', borderRadius: '4px', bgcolor: '#7ea4ca'}} onClick={() => {
        console.log(siteInfo);
        handleClickDetail(siteInfo);
      }}>Detail</RectButton>}
    </div>
  );
});

type CustomTreeItemProps = TreeItemProps & {
  siteInfo: SiteInfo | null;
  handleClickDetail: any;
  path: string
}

const CustomTreeItem = ({siteInfo, handleClickDetail, path, ...props}: CustomTreeItemProps) => (
  <TreeItem ContentComponent={CustomContent as any}
            ContentProps={{siteInfo, handleClickDetail, path} as any} {...props} />
);
