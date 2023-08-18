import {
  useCallback, useMemo, useState, useEffect, useRef,
} from 'react';
import {ForceGraph2D} from 'react-force-graph';

import {CONFIG, RECT} from '@/components/Canvas/const.ts';
import {TLink, TNode} from '@/components/Canvas/types.ts';
import {renderNode} from '@/components/Canvas/CanvasNode.ts';
import {genRandomTree, normalizeData} from '@/components/Canvas/utils.ts';


const Canvas = () => {
  const fgRef = useRef();
  const data = useMemo(() => {
    const gData = genRandomTree(10);
    normalizeData(gData)
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


  useEffect(() => {
    const fg = fgRef.current;
    // @ts-ignore
    fg.d3Force('link').distance(CONFIG.graph.distance);
  });

  const paintNode = useCallback(
    renderNode, [hoverNode],
  );

  return (
    <ForceGraph2D
      ref={fgRef}
      graphData={data}
      nodeRelSize={(RECT.width + RECT.height) / 2}
      autoPauseRedraw={false}

      backgroundColor={CONFIG.theme.bgColor}

      linkWidth={CONFIG.graph.linkWidth}
      linkDirectionalParticles={link => link.value}
      linkDirectionalParticleWidth={CONFIG.graph.linkDirectionalParticleWidth}

      nodeCanvasObject={(node, ctx) => paintNode({
        highlightLvl: (hoverNode === node) ? 2 : (highlightNodes.has(node)) ? 1 : 0,
        node: data.nodes[node.id],
      }, node, ctx)}
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
