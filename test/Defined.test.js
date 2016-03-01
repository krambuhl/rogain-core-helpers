var test = require('tape');
var Defined = require('../dist').Defined;

var defTree = {
  type: 'helper',
  name: 'Defined',
  children: [{
    type: 'tag',
    name: 'div'
  }]
};

test('<Defined data={defined}><div /></Defined>', function(t) {
  t.plan(3);
  var tree = Object.assign({ }, defTree, { data: 'hello' })
  var res = Defined(tree, { });

  t.equal(res.length, 1);
  t.equal(res[0].type, 'tag');
  t.equal(res[0].name, 'div');
});

test('<Defined data={undefined}><div /></Defined>', function(t) {
  t.plan(1);

  var tree = Object.assign({ }, defTree, { data: undefined })
  var res = Defined(tree, { });

  t.equal(res === undefined, true);
});

test('<Defined data={undefined}><Else /><div /></Defined>', function(t) {
  t.plan(3);

  var tree = Object.assign({ }, defTree, { data: undefined })
  tree.children.unshift({ type: 'helper', name: 'Else' });
  var res = Defined(tree, { });

  t.equal(res.length, 1);
  t.equal(res[0].type, 'tag');
  t.equal(res[0].name, 'div');
});

test('<Defined data={emptyArray}><div /></Defined>', function(t) {
  t.plan(1);

  var tree = Object.assign({ }, defTree, { data: [] })
  var res = Defined(tree, { });

  t.equal(res === undefined, true);
});

test('<Defined data={nonEmptyArray}><div /></Defined>', function(t) {
  t.plan(3);

  var tree = Object.assign({ }, defTree, { data: [1,2] })
  var res = Defined(tree, { });

  t.equal(res.length, 1);
  t.equal(res[0].type, 'tag');
  t.equal(res[0].name, 'div');
});

test('<Defined data={emptyObject}><div /></Defined>', function(t) {
  t.plan(1);

  var tree = Object.assign({ }, defTree, { data: {} })
  var res = Defined(tree, { });

  t.equal(res === undefined, true);
});

test('<Defined data={nonEmptyObject}><div /></Defined>', function(t) {
  t.plan(3);

  var tree = Object.assign({ }, defTree, { data: { name: null } })
  var res = Defined(tree, { });

  t.equal(res.length, 1);
  t.equal(res[0].type, 'tag');
  t.equal(res[0].name, 'div');
});