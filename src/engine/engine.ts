import {THook, TopoLink, TopoNode} from '@/engine/types.ts';

export default class Engine {
  nodes: TopoNode[];
  links: TopoLink[];
  hooks: THook[];
  history: TopoNode[][];
  constructor(nodes: TopoNode[], links: TopoLink[], hooks: THook[]) {
    this.nodes = nodes;
    this.links = links;
    this.hooks = [];
    this.history = [];
    hooks.forEach(hook => this.hooks[hook.listenId] = hook);
  }

  Update() {
    this.history.push([...this.nodes]);
    // use Hooks
    const freeForBalance = this.useHooks();
    // check simulation
    // TODO
    // if overload, balance:
  }

  useHooks() {
    const freeForBalance: TopoNode[] = [];
    this.nodes.forEach((node, index) => {
      const hook = this.hooks[node.id];
      if (hook.listenId === index) {
        hook.callback(node.status);
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
      links: this.links
    }
  }
}