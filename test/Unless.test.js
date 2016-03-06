var test = require('tape');
var Unless = require('../dist').Unless;

var defTree = {
  type: 'component',
  name: 'Unless',
  attrs: {},
  children: [{
    type: 'tag',
    name: 'div'
  }]
};

test('<Unless data={undefined}><div /></Unless> :: no value attr', function(t) {
  t.plan(3);

  var tree = Object.assign({ }, defTree, { data: undefined });
  var res = Unless(tree, { });

  t.equal(res.length, 1);
  t.equal(res[0].type, 'tag');
  t.equal(res[0].name, 'div');
});

test('<Unless data={defined}><div /></Unless> :: no value attr', function(t) {
  t.plan(1);

  var tree = Object.assign({ }, defTree, { data: 123 });
  var res = Unless(tree, { });

  t.equal(res === undefined, true);
});

test('<Unless data=123 value=123><div /></Unless> :: unequal', function(t) {
  t.plan(1);

  var tree = Object.assign({ }, defTree, { data: 123, attrs: { value: 123 } });
  var res = Unless(tree, { });

  t.equal(res === undefined, true);
});

test('<Unless data=123 value=789><div /><Else /><p /></Unless> :: equal', function(t) {
  t.plan(3);

  var tree = Object.assign({ }, defTree, { data: 123, attrs: { value: 789 } });
  tree.children.push({ type: 'component', name: 'Else' });
  tree.children.push({ type: 'tag', name: 'p' });
  var res = Unless(tree, { });

  t.equal(res.length, 1);
  t.equal(res[0].type, 'tag');
  t.equal(res[0].name, 'div');
});

test('<Unless data=123 value=123><p /><Else /><div /></Unless> :: unequal else', function(t) {
  t.plan(3);

  var tree = Object.assign({ }, defTree, { data: 123, attrs: { value: 123 } })
  tree.children.unshift({ type: 'component', name: 'Else' });
  tree.children.unshift({ type: 'tag', name: 'p' });
  var res = Unless(tree, { });

  t.equal(res.length, 1);
  t.equal(res[0].type, 'tag');
  t.equal(res[0].name, 'div');
});