import { createFrame } from 'rogain-utils';
export default function Frame(tree, props) {
  return createFrame(tree.children, tree.attrs);
};