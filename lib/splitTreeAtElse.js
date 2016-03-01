import { splitTrees } from 'rogain-utils';
export default function splitTreeAtElse(tree) {
  return splitTrees(tree.children, { type: 'helper', name: 'Else' });
}