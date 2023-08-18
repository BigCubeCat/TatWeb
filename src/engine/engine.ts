import {TopoLink, TopoNode} from '@/engine/types.ts';

export default class Engine {
  nodes: TopoNode[];
  links: TopoLink[];
  constructor(nodes: TopoNode[], links: TopoLink[]) {
    this.links = links;
    this.nodes = nodes;
  }

}