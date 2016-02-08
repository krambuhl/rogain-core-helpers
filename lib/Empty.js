import splitTreeAtElse from './splitTreeAtElse';

export default function Empty(tree, props) {
  var split = splitTreeAtElse(tree);
  if (tree.data) {
    if (Array.isArray(tree.data)) {
      if (tree.data.length === 0) return split[0];
    } else if (typeof tree.data === 'object') {
      if (Object.keys(tree.data).length === 0) return split[0];
    } else {
      return split[1];
    }
  }
  return split[1];
};