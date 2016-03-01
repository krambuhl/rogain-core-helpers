import splitTreeAtElse from './splitTreeAtElse'
import Empty from './Empty';

export default function Unless(tree, props) {
  if (!tree.attrs.value) {
    return Empty(tree, props);
  }

  var split = splitTreeAtElse(tree);
  var res = split[1];
  
  if (tree.data != tree.attrs.value) {
    res = split[0];
  }

  return res && res.length > 0 ? res : undefined;
};