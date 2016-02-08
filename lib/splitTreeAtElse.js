import { splitTree } from 'rogain-tree-utils';
export default function splitTreeAtElse(tree) {
  return splitTree(tree.children, { type: 'helper', name: 'Else' });
}