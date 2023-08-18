import {StationType} from '@/engine/types.ts';

export type TNode = {
  id: number;
  value: {
    type: StationType,
    title: string
  };
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
