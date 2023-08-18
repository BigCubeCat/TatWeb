import {CONFIG, RECT} from '@/components/Canvas/const.ts';
import {NodeObject} from 'react-force-graph-2d';

const paintRing = (isMainNode: boolean, node: NodeObject, ctx: CanvasRenderingContext2D) => {
  // add ring just for highlighted nodes
  ctx.beginPath();
  paintBox(
    node,
    isMainNode ? CONFIG.theme.primaryColor : CONFIG.theme.secondaryColor, ctx,
  );
  ctx.fill();
};

const paintBox = (node: NodeObject, color: string, ctx: CanvasRenderingContext2D) => {
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

const paintText = (node: NodeObject, text: string, color: string, ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = color;
  ctx.font = '10px Sans-Serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, node.x || 0, node.y || 0);
};

const paintNode = (node: NodeObject, color: string, ctx: CanvasRenderingContext2D) => {
  paintBox(node, color, ctx);
};

interface IRenderNodeConf {
  highlightLvl: number;
}

const renderNode = (renderConf: IRenderNodeConf, node: NodeObject, ctx: CanvasRenderingContext2D) => {
  // add ring just for highlighted nodes
  ctx.beginPath();
  paintNode(node, CONFIG.theme.mainColor, ctx);
  if (renderConf.highlightLvl > 0) {
    paintRing(renderConf.highlightLvl == 2, node, ctx);
  }
  paintText(node, '' + node.id, CONFIG.theme.textColor, ctx);
  ctx.fill();
};
export {renderNode, paintRing};