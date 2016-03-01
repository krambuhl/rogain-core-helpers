import splitTreeAtElse from './splitTreeAtElse';

export default function Empty(tree, props) {
  var split = splitTreeAtElse(tree);
  var res;

  if (tree.data === undefined) {
    res = split[0];
  } else if (Array.isArray(tree.data)) {
    res = split[tree.data.length > 0 ? 1 : 0];
  } else if (typeof tree.data === 'object') {
    res = split[Object.keys(tree.data).length > 0 ? 1 : 0];
  } else {
    res = split[1];
  }

  return res && res.length > 0 ? res : undefined;
};