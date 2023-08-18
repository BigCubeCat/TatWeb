export type StationType = "dns" | "finish" | "node"
export type TopoNode = {
  id: number;
  type: StationType;
  size: number;
  content: number;
  input: number;
  output: number;
};

export type TopoLink = {
  from: number;
  to: number;
  d: number;
  length: number;
  bandwidth: number;
}