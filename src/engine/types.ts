export type StationType = "dns" | "finish" | "node"
export type TopoNode = {
  id: number;
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

interface ICallbackProp {
  size: number;
  content: number;
  input: number;
}

export type THook = {
  listenId: number;
  callback: (props: ICallbackProp) => number; // return new output
}