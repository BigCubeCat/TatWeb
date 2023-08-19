import {THook, TopoLink, TopoNode} from '@/engine/types.ts';

export default class Engine {
  nodes: TopoNode[];
  links: TopoLink[];
  hooks: THook[];
  history: TopoNode[][];
  tp: object;

  constructor(nodes: TopoNode[], links: TopoLink[], hooks: THook[]) {
    this.nodes = nodes;
    this.links = links;
    this.hooks = [];
    this.history = [];
    hooks.forEach(hook => this.hooks[hook.listenId] = hook);

    this.tp = {
      capacity: {
        value: 20, filled: 10
      },
      incoming_dnses: [
        {
          id: 1,
          capacity: {
            value: 10, filled: 3
          },
          incoming_dnses: [],
          out_pipes: [
            {
              capacity: {
                value: 7,
                filled: 0
              }
            }
          ]
        }
      ]
    }
  }

  Update() {
    this.history.push([...this.nodes]);
    // use Hooks
    const freeForBalance = this.useHooks();
    console.log(freeForBalance)
    // check simulation
    wasm.init_tp(JSON.stringify(this.tp));
    console.log(wasm.update(JSON.stringify([{
      id: 1, in: 5, out: 7
    }])));
    console.log(wasm.dump());
    // if overload, balance:

  }

  useHooks() {
    const freeForBalance: TopoNode[] = [];
    this.nodes.forEach((node, index) => {
      const hook = this.hooks[node.id];
      if (hook.listenId === index) {
//        hook.callback(node.status);
      } else {
        freeForBalance.push(node);
      }
    });
    return freeForBalance;
  }

  addHook(hook: THook) {
    this.hooks.push(hook);
  }

  setHooks(hooks: THook[]) {
    this.hooks = hooks;
  }

  Load(props: {nodes: TopoNode[], links: TopoLink[], hooks: THook[]}) {
    this.nodes = props.nodes;
    this.links = props.links;
    this.hooks = props.hooks;
  }

  Save() {
    return {
      nodes: this.nodes,
      links: this.links,
    };
  }
}