import {TLink, TNode, TTree} from '@/components/Canvas/types.ts';

export default function genRandomTree(N = 300): TTree {
  const nodes: TNode[] = [...Array(N).keys()].map((i) => ({
    id: i,
    neighbors: [],
    links: [],
    value: Math.round(Math.random() * 10),
  }));
  const links: TLink[] = [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
      value: Math.round(Math.random() * 10),
    }));
  return {
    nodes, links,
  };
}