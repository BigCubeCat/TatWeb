import {TopoNode, TopoLink} from '@/engine/types.ts';

export type TNode = {
  id: number;
  value: TopoNode;
  neighbors: TNode[];
  links: TLink[];
};

export type TLink = {
  source: number;
  target: number;
  value: number;
};

export type TTree = {
  nodes: TNode[];
  links: TLink[];
};

export const generateTNode = (node: TopoNode): TNode => {
  return {
    id: node.id,
    value: node,
    neighbors: [],
    links: [],
  };
};

export const generateTLink = (link: TopoLink): TLink => {
  return {
    source: link.from,
    target: link.to,
    value: Math.round(link.bandwidth / 10000),
  };
};
