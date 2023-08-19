import {TLink, TNode, TTree} from '@/components/Canvas/types.ts';

export function genRandomTree(N = 300): TTree {
  const nodes: TNode[] = [];
  for (let i = 0; i < N; ++i) {
    nodes.push({
      id: i,
      neighbors: [],
      links: [],
      value: {
        type: !i ? 'finish' : 'dns',
        title: 'ДНС-' + i,
      },
    });
  }

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