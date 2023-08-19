import {TLink, TNode, TTree} from '@/components/Canvas/types.ts';
import {TopoLink, TopoNode} from '@/engine/types.ts';

export function normalizeData(tree: TTree): TTree {
  // cross-link node objects
  tree.links.forEach((link: TLink) => {
    const a = tree.nodes[link.source];
    const b = tree.nodes[link.target];
    !a.neighbors && (a.neighbors = []);
    !b.neighbors && (b.neighbors = []);
    a.neighbors.push(b);
    b.neighbors.push(a);

    !a.links && (a.links = []);
    !b.links && (b.links = []);
    a.links.push(link);
    b.links.push(link);
  });
  return tree;
}

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
    value: Math.round(link.bandwidth / 20000),
  };
};