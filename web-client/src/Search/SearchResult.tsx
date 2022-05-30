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
    if (url.includes(node.path)) {
      return getTargetNode(node, url);
    }
  }
  return current;
}

function findNode(current: PageNode, path: string): PageNode | null {
  if (current.path === path) {
    return current
  }
  for (const node of current.children) {
    if (path.includes(node.path)) {
      return findNode(node, path);
    }
  }
  return null;
}

export function SearchResult({data, url}: { data: SiteInfo[], url: string }) {
  // data.sort((a, b) => a.url > b.url ? 1 : -1);
  console.log(data);
  const root = new PageNode('', null);
  data.forEach(v => {
    if (v.url.includes('?')) {
      const [path, query] = v.url.split('?');
      const n = findNode(root, path);
      if (n) {
        n.children.push(new PageNode(v.url, v))
        return;
      } else {
        const m = getTargetNode(root, path);
        m.children.push(new PageNode(path, null))
      }
    }
    const node = getTargetNode(root, v.url);
    node.children.push(new PageNode(v.url, v))
  })

  console.log(root);
  return (
    <Box>
      <T variant='h5' sx={{mb: 1}}>Analysis Result</T>
      <Paper sx={{mb: '32px', p: 2, border: '1px solid black'}}>
        <T sx={{pb: 1}}>Total Pages : {data.length}</T>
        {/*<T sx={{pb:1}}>Max Depth : </T>*/}
        <T sx={{pb: 1}}>Traffic Score : {data[0].traffic}</T>
        {/*<T sx={{pb:1}}>Other Services : </T>*/}
        <Divider sx={{my: 3}}/>
        <T sx={{pb: 1}}>Tree Structure</T>
        <TreeViewResult root={root}/>
      </Paper>
    </Box>
  );
}