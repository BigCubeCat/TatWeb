import {CONFIG, RECT} from '@/components/Canvas/const.ts';
import {NodeObject} from 'react-force-graph-2d';
import {TNode} from '@/components/Canvas/types.ts';

const paintBox = (
  node: NodeObject,
  color: string,
  ctx: CanvasRenderingContext2D,
) => {
  ctx.fillStyle = color;
  ctx.fillRect(
    (node.x || 0) - RECT.width / 2,
    (node.y || 0) - RECT.height / 2,
    RECT.width,
    RECT.height,
  );
  ctx.fillStyle = CONFIG.theme.bgColor;
  ctx.fillRect(
    (node.x || 0) - (RECT.width / 2 - RECT.padding),
    (node.y || 0) - (RECT.height / 2 - RECT.padding),
    RECT.width - 2 * RECT.padding,
    RECT.height - 2 * RECT.padding,
  );
};

const paintText = (
  node: NodeObject,
  text: string,
  color: string,
  ctx: CanvasRenderingContext2D,
) => {
  ctx.fillStyle = color;
  ctx.font = '10px Sans-Serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, node.x || 0, node.y || 0);
};

const paintConnection = (x: number, y: number, color: string, ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 3, 0, 2 * Math.PI, false);
  ctx.fill();
};

const paintNode = (
  node: NodeObject,
  nodeObject: TNode,
  color: string,
  ctx: CanvasRenderingContext2D,
) => {
  if (nodeObject.value.type !== 'node') {
    paintBox(node, color, ctx);
  } else {
    paintConnection(Number(node.x), Number(node.y), color, ctx);
  }
};

interface IRenderNodeConf {
  highlightLvl: number;
  node: TNode;
}

const renderNode = (
  renderConf: IRenderNodeConf,
  node: NodeObject,
  ctx: CanvasRenderingContext2D,
) => {
  // add ring just for highlighted nodes
  ctx.beginPath();
  paintNode(node, renderConf.node, CONFIG.theme.mainColor, ctx);
  paintText(node, renderConf.node.value.title, CONFIG.theme.textColor, ctx);
  ctx.fill();
};
export {renderNode, paintRing};
