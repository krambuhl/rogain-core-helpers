import { createFrame, createDefaultLocals } from 'rogain-utils';

export default function Each(tree, props) {
  var locals = createDefaultLocals(tree, props);
  if (Array.isArray(tree.data)) {
    return tree.data.map((data, index) => {
      var frameData = Object.assign({}, locals, { 
        '@index': index,
        '@length': tree.data.length
      });
      frameData[tree.attrs.as ? tree.attrs.as : '@item'] = data;
      return createFrame(tree.children, frameData);
    });
  }
};