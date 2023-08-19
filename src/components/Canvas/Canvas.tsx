import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ForceGraph2D} from 'react-force-graph';

import {CONFIG, RECT} from '@/components/Canvas/const.ts';
import {
  generateTLink,
  generateTNode,
  TLink,
  TNode,
} from '@/components/Canvas/types.ts';
import {renderNode} from '@/components/Canvas/CanvasNode.ts';
import {normalizeData} from '@/components/Canvas/utils.ts';
import {useAppDispatch, useAppSelector} from '@/store/hooks.ts';
import {selectGraphSlice, setSelected} from '@/store/graphSlice/graphStore.ts';

const Canvas = () => {
  const dispatch = useAppDispatch();
  const engine = useAppSelector(selectGraphSlice).engine;

  const fgRef = useRef();
  const data = useMemo(() => {
    return normalizeData({
      nodes: engine.tree.nodes.map((node) => generateTNode(node)),
      links: engine.tree.links.map((link) => generateTLink(link)),
    });
  }, [engine.tree]);

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

    updateHighlight();
  };
  const handleNodeClick = (node: any) => {
    setHoverNode(node || null);
    dispatch(setSelected(data.nodes[node.id].id));
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

  const paintNode = useCallback(renderNode, [hoverNode]);

  return (
    <ForceGraph2D
      ref={fgRef}
      graphData={data}
      nodeRelSize={(RECT.width + RECT.height) / 2}
      autoPauseRedraw={false}
      backgroundColor={CONFIG.theme.bgColor}
      linkWidth={CONFIG.graph.linkWidth}
      linkDirectionalParticles={(link) => link.value}
      linkDirectionalParticleWidth={CONFIG.graph.linkDirectionalParticleWidth}
      nodeCanvasObject={(node, ctx) =>
        paintNode(
          {
            highlightLvl:
              hoverNode === node ? 2 : highlightNodes.has(node) ? 1 : 0,
            node: data.nodes[node.id],
          },
          node,
          ctx,
        )
      }
      // handle events
      onNodeClick={handleNodeClick}
      onNodeDrag={handleNodeClick}
      onNodeHover={handleNodeHover}
      onLinkHover={handleLinkHover}
      // Fix node position after drag
      onNodeDragEnd={(node) => {
        node.fx = node.x;
        node.fy = node.y;
        node.fz = node.z;
      }}
    />
  );
};

export default Canvas;
