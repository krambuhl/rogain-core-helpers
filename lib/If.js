import splitTreeAtElse from './splitTreeAtElse'
import Defined from './Defined';

export default function If(tree, props) {
  if (!tree.attrs.value) {
    return Defined(tree, props);
  }

  var split = splitTreeAtElse(tree);
  var res = split[1];
  
  if (tree.data == tree.attrs.value) {
    res = split[0];
  }

  return res && res.length > 0 ? res : undefined;
};