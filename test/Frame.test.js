var test = require('tape');
var Frame = require('../dist').Frame;

const defTree = {
  type: 'component',
  name: 'Frame',
  attrs: {
    color: { hex: '#f00', name: 'red' },
  },
  children: [{ 
    type: 'tag', 
    name: 'div'
  }]
};

test('<Frame color={colorData}><div /></Frame>', function(t) {
  var res = Frame(defTree, { });

  t.plan(5);

  t.equal(res.type, 'frame');
  t.equal(res.children[0].type, 'tag');
  t.equal(res.children[0].name, 'div');
  t.equal(res.locals.color.hex, '#f00');
  t.equal(res.locals.color.name, 'red');
});