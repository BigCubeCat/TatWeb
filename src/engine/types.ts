export type StationType = 'dns' | 'finish' | 'node'
export type TopoNode = {
  id: number;
  dnsId: number;
  title: string;
  type: StationType;
  status: {
    size: number;
    content: number;
    input: number;
    output: number;
  }
};

export type TopoLink = {
  from: number;
  to: number;
  d: number; // Диаметр
  length: number; // длинна
  bandwidth: number;
}

export type THook = {
  listenId: number;
  sign: '<' | '>' | '~';
  interval: number;
  count: number;
  output: number;
}

export type TTree = {
  nodes: TopoNode[];
  links: TopoLink[];
};

export type TEngine = {
  tree: TTree;
  hooks: THook[];
  history: TTree[];
  broken: number[];
};

export type TRequest = {
  enters: number[], // Список начальных ДНС
  loaded: number[],
};
