import splitTreeAtElse from './splitTreeAtElse';
import Empty from './Empty';

export default function Unless(tree, props) {
  if (!tree.attrs.value) return Empty(tree, props);
  var split = splitTreeAtElse(tree);
  if (tree.data != tree.attrs.value) return split[0];
  return split[1];
};