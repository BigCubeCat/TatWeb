import {TLink, TTree} from '@/components/Canvas/types.ts';

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
