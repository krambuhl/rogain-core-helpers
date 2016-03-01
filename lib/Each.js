import { createFrame } from 'rogain-utils';

export default function Each(tree, props) {
  if (Array.isArray(tree.data)) {
    return tree.data.map(arrayMap, tree);
  } else if (typeof tree.data === 'object') {
    return Object.keys(tree.data).map(objectMap, tree);
  }
}

export function objectMap(key, i) {
  var locals = createLocals.call(this, this.data[key], {
    '@key': key, 
    '@index': i,
    '@length': Object.keys(this.data).length
  });

  return createFrame(this.children, locals);
}

export function arrayMap(item, i) {
  var locals = createLocals.call(this, item, {
    '@index': i,
    '@length': this.data.length
  });

  return createFrame(this.children, locals);
}

export function createLocals(item, dat) {
  var locals = { };
  locals[this.attrs.as || '@item'] = item;
  Object.assign(locals, dat);
  return locals;
}