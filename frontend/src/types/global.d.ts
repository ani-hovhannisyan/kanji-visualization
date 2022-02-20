type NodeObject = import("react-force-graph-2d").NodeObject;

interface ExtendedNodeObject extends NodeObject {
  isMain?: string;
}

interface Links {
  source: string;
  target: string;
}

interface GraphMatrix {
  nodes: ExtendedNodeObject[];
  links: Links[];
}

type KanjiInfo = {
  id: string;
  isMain?: string;
  onyomi: string[];
  kunyomi: string[];
  meaning: string[];
}

type ResponseData = GraphMatrix & {
  info: KanjiInfo;
};
