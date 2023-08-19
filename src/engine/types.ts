export type StationType = 'dns' | 'finish' | 'node'
export type TopoNode = {
  id: number;
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
  d: number;
  length: number;
  bandwidth: number;
}

export type THook = {
  listenId: number;
  sign: "<" | ">" | "~";
  interval: number;
  count: number;
  output: number;
}