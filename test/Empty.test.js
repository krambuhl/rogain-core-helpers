var test = require('tape');
var Empty = require('../dist').Empty;

var defTree = {
  type: 'helper',
  name: 'Empty',
  children: [{
    type: 'tag',
    name: 'div'
  }]
};

test('<Empty data={undefined}><div /></Empty>', function(t) {
  t.plan(3);
  var tree = Object.assign({ }, defTree, { data: undefined })
  var res = Empty(tree, { });

  t.equal(res.length, 1);
  t.equal(res[0].type, 'tag');
  t.equal(res[0].name, 'div');
});

test('<Empty data={undefined}><div /></Empty>', function(t) {
  t.plan(1);

  var tree = Object.assign({ }, defTree, { data: 'hello' })
  var res = Empty(tree, { });

  t.equal(res === undefined, true);
});

test('<Empty data={undefined}><Else /><div /></Empty>', function(t) {
  t.plan(3);

  var tree = Object.assign({ }, defTree, { data: 'hello' })
  tree.children.unshift({ type: 'helper', name: 'Else' });
  var res = Empty(tree, { });

  t.equal(res.length, 1);
  t.equal(res[0].type, 'tag');
  t.equal(res[0].name, 'div');
});

test('<Empty data={emptyArray}><div /></Empty>', function(t) {
  t.plan(1);

  var tree = Object.assign({ }, defTree, { data: [] })
  var res = Empty(tree, { });

  t.equal(res === undefined, true);
});

test('<Empty data={nonEmptyArray}><div /></Empty>', function(t) {
  t.plan(3);

  var tree = Object.assign({ }, defTree, { data: [1,2] })
  var res = Empty(tree, { });

  t.equal(res.length, 1);
  t.equal(res[0].type, 'tag');
  t.equal(res[0].name, 'div');
});

test('<Empty data={emptyObject}><div /></Empty>', function(t) {
  t.plan(1);

  var tree = Object.assign({ }, defTree, { data: {} })
  var res = Empty(tree, { });

  t.equal(res === undefined, true);
});

test('<Empty data={nonEmptyObject}><div /></Empty>', function(t) {
  t.plan(3);

  var tree = Object.assign({ }, defTree, { data: { name: null } })
  var res = Empty(tree, { });

  t.equal(res.length, 1);
  t.equal(res[0].type, 'tag');
  t.equal(res[0].name, 'div');
});