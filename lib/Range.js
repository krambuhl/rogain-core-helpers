import splitTreeAtElse from './splitTreeAtElse';

export default function Range(tree, props) {
  var split = splitTreeAtElse(tree);
  var data = parseInt(tree.data, 10);
  var min = parseInt(tree.attrs.min, 10);
  var max = parseInt(tree.attrs.max, 10);
  var passing = false;

  if (!isNaN(min) && !isNaN(max)) {
    if (data >= min && data <= max) passing = true;
  } else if (!isNaN(min)) {
    if (data >= min) passing = true;
  } else if (!isNaN(max)) {
    if (data <= max) passing = true;
  }

  if (passing) return split[0];
  return split[1];
};