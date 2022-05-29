import {Paper, Box, Divider} from "@mui/material";
import {T} from "../CommonComponents/TextComponent";
import {TreeViewResult} from "./TreeViewResult";
import {SiteInfo} from "../SWRHooks/useAnalyzedData";

export class PageNode {
  path: string;
  data: SiteInfo | null;
  children: PageNode[];
  constructor(path: string, data: SiteInfo | null) {
    this.path = path;
    this.data = data;
    this.children = [];
  }
}


function getTargetNode(current: PageNode, url: string): PageNode {
  for (const node of current.children) {
    if (node.path.includes(url)) {
      return getTargetNode(node, url);
    }
  }
  return current;
}

export function SearchResult({data, url}: {data: SiteInfo[], url: string}) {
  console.log(data);
  const root = new PageNode('', null);
  data.forEach(v => {
    const node = getTargetNode(root, v.url);
    node.children.push(new PageNode(v.url, v))
  })

  return (
    <Box>
      <T variant='h5' sx={{mb:1}}>Analysis Result</T>
      <Paper sx={{mb: '32px', p: 2, border: '1px solid black'}}>
        <T sx={{pb:1}}>Total Pages : {data.length}</T>
        {/*<T sx={{pb:1}}>Max Depth : </T>*/}
        <T sx={{pb:1}}>Traffic Score : {data[0].traffic}</T>
        {/*<T sx={{pb:1}}>Other Services : </T>*/}
        <Divider sx={{my: 3}}/>
        <T sx={{pb:1}}>Tree Structure</T>
        <TreeViewResult root={root}/>
      </Paper>
    </Box>
  );
}