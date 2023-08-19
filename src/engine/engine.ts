import {TEngine, TopoLink, TopoNode, TRequest} from '@/engine/types.ts';

export const readEngine = (data: string): TEngine => {
  const obj: {nodes: TopoNode[]; joins: TopoNode[]; links: TopoLink[]} =
    JSON.parse(data);
  const links: TopoLink[] = obj.links.map((link) => {
    return {...link, bandwidth: link.length * link.d * 0.63};
  });
  return {
    tree: {
      nodes: [...obj.nodes, ...obj.joins],
      links: links,
    },
    history: [],
    hooks: [],
    broken: [],
    signalHooks: [],
  };
};

const getCurrentLinks = (eng: TEngine, ids: number[]) => {
  return eng.tree.links.filter((link) => ids.includes(link.from));
};

export const updateEngine = (eng: TEngine, req: TRequest) => {
  // Загружаем наальные данные
  req.enters.forEach((enter, index) => {
    eng.tree.nodes[enter].status.input = req.loaded[index];
  });

  let currentNodes: number[] = req.enters.map(
    (enter) => eng.tree.nodes[enter].id,
  );
  while (currentNodes.length > 0) {
    const newNodes: number[] = [];
    // Перекачка
    const links = getCurrentLinks(eng, currentNodes);
    links.forEach((link) => {
      // Посчитать, сколько мы отправим в действительности
      eng.tree.nodes[link.to].status.input = Math.min(link.bandwidth, 0);
      newNodes.push(link.to);
    });
    currentNodes = newNodes;
  }
};
