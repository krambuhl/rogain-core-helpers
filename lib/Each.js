import { createFrame } from 'rogain-utils';

export default function Each(tree, props) {
  if (Array.isArray(tree.data)) {
    return tree.data.map(arrayMap, tree);
  } else if (typeof tree.data === 'object') {
    return Object.keys(tree.data).map(objectMap, tree);
  }
}

export function objectMap(key, i) {
  var locals = {
    '@key': key, 
    '@index': i,
    '@length': Object.keys(this.data).length
  };

  locals[this.attrs.as || '@item'] = this.data[key];

  return createFrame(this.children, locals);
}

export function arrayMap(item, i) {
  var locals = {
    '@index': i,
    '@length': this.data.length
  };

  locals[this.attrs.as || '@item'] = item;

  return createFrame(this.children, locals);
}