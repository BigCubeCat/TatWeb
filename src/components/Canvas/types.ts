export type TNode = {
  id: number;
  value: number;
  neighbors: TNode[];
  links: TLink[];
};

export type TLink = {
  source: number;
  target: number;
  value: number;
};

export type TTree = {
  nodes: TNode[];
  links: TLink[];
};
