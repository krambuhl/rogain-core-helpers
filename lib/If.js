import splitTreeAtElse from './splitTreeAtElse'
import Defined from './Defined';

export default function If(tree, props) {
  if (!tree.attrs.value) return Defined(tree, props);
  var split = splitTreeAtElse(tree);
  if (tree.data == tree.attrs.value) return split[0];
  return split[1];
};