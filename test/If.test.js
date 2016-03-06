var test = require('tape');
var If = require('../dist').If;

var defTree = {
  type: 'component',
  name: 'If',
  attrs: {},
  children: [{
    type: 'tag',
    name: 'div'
  }]
};

test('<If data={defined}><div /></If> :: no value attr', function(t) {
  t.plan(3);

  var tree = Object.assign({ }, defTree, { data: 1234 });
  var res = If(tree, { });

  t.equal(res.length, 1);
  t.equal(res[0].type, 'tag');
  t.equal(res[0].name, 'div');
});

test('<If data={undefined}><div /></If> :: no value attr', function(t) {
  t.plan(1);

  var tree = Object.assign({ }, defTree, { data: undefined });
  var res = If(tree, { });

  t.equal(res === undefined, true);
});

test('<If data=123 value=789><div /></If> :: unequal', function(t) {
  t.plan(1);

  var tree = Object.assign({ }, defTree, { data: 123, attrs: { value: 789 } });
  var res = If(tree, { });

  t.equal(res === undefined, true);
});

test('<If data=123 value=123><div /><Else /><p /></If> :: equal', function(t) {
  t.plan(3);

  var tree = Object.assign({ }, defTree, { data: 123, attrs: { value: 123 } });
  tree.children.push({ type: 'component', name: 'Else' });
  tree.children.push({ type: 'tag', name: 'p' });
  var res = If(tree, { });

  t.equal(res.length, 1);
  t.equal(res[0].type, 'tag');
  t.equal(res[0].name, 'div');
});

test('<If data=123 value=789><p /><Else /><div /></If> :: unequal else', function(t) {
  t.plan(3);

  var tree = Object.assign({ }, defTree, { data: 123, attrs: { value: 789 } })
  tree.children.unshift({ type: 'component', name: 'Else' });
  tree.children.unshift({ type: 'tag', name: 'p' });
  var res = If(tree, { });

  t.equal(res.length, 1);
  t.equal(res[0].type, 'tag');
  t.equal(res[0].name, 'div');
});