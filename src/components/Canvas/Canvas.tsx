import {useCallback, useMemo, useState} from 'react';
import {ForceGraph2D as ForceGraph} from 'react-force-graph';

import {TLink, TNode, TTree} from '@/components/Canvas/types.ts';

function genRandomTree(N = 300): TTree {
  const nodes: TNode[] = [...Array(N).keys()].map((i) => ({
    id: i,
    neighbors: [],
    links: [],
    value: Math.round(Math.random() * 10)
  }));
  const links: TLink[] = [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      target: id,
      source: Math.round(Math.random() * (id - 1)),
      value: 0,
    }));
  return {
    nodes, links,
  };
}

const NODE_R = 8;
const Canvas = () => {
  const data = useMemo(() => {
    const gData = genRandomTree(10);

    // cross-link node objects
    gData.links.forEach((link: TLink) => {
      const a = gData.nodes[link.source];
      const b = gData.nodes[link.target];
      !a.neighbors && (a.neighbors = []);
      !b.neighbors && (b.neighbors = []);
      a.neighbors.push(b);
      b.neighbors.push(a);

      !a.links && (a.links = []);
      !b.links && (b.links = []);
      a.links.push(link);
      b.links.push(link);
    });

    return gData;
  }, []);

  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState(null);

  const updateHighlight = () => {
    setHighlightNodes(highlightNodes);
    setHighlightLinks(highlightLinks);
  };

  const handleNodeHover = (node: any) => {
    highlightNodes.clear();
    highlightLinks.clear();
    if (node) {
      highlightNodes.add(node);
      node.neighbors.forEach((neighbor: TNode) => highlightNodes.add(neighbor));
      node.links.forEach((link: TLink) => highlightLinks.add(link));
    }

    setHoverNode(node || null);
    updateHighlight();
  };

  const handleLinkHover = (link: any) => {
    highlightNodes.clear();
    highlightLinks.clear();

    if (link) {
      highlightLinks.add(link);
      highlightNodes.add(link.source);
      highlightNodes.add(link.target);
    }

    updateHighlight();
  };

  const paintRing = useCallback(
    (node: any, ctx: CanvasRenderingContext2D) => {
      // add ring just for highlighted nodes
      ctx.beginPath();
      ctx.arc(node.x, node.y, NODE_R * 1.4, 0, 2 * Math.PI, false);
      ctx.fillStyle = node === hoverNode ? 'red' : 'orange';
      // setup text
      ctx.font = '20px Sans-Serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(hoverNode ? "" + hoverNode?.value : "", node.x, node.y - 20);

      ctx.fill();
    },
    [hoverNode],
  );

  return (
    <ForceGraph
      graphData={data}
      nodeRelSize={NODE_R}
      autoPauseRedraw={false}

      linkWidth={5}
      linkDirectionalParticles={4}
      linkDirectionalParticleWidth={4}

      nodeCanvasObjectMode={(node) =>
        highlightNodes.has(node) ? 'before' : undefined
      }
      nodeCanvasObject={paintRing}
      // handle events
      onNodeHover={handleNodeHover}
      onLinkHover={handleLinkHover}
      // Fix node position after drag
      onNodeDragEnd={node => {
        node.fx = node.x;
        node.fy = node.y;
        node.fz = node.z;
      }}
    />
  );
};

export default Canvas;
