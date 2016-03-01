var test = require('tape');
var splitTreeAtElse = require('../dist/splitTreeAtElse');

const defTree = {
  type: 'tag',
  name: 'div',
  attrs: { },
  children: []
};

test('splitTreeAtElse(tree) :: no children', function(t) {
  t.plan(2);

  var res = splitTreeAtElse(defTree);

  t.equal(res.length, 1);
  t.equal(res[0].length, 0);
});

test('splitTreeAtElse(tree) :: first', function(t) {
  t.plan(5);

  var tree = Object.assign({ }, defTree, { 
    attrs: { }, 
    children: [
      { type: 'helper', name: 'Else' },
      { type: 'tag', name: 'p' }
    ]
  });

  var res = splitTreeAtElse(tree);

  t.equal(res.length, 2);
  t.equal(res[0].length, 0);

  t.equal(res[1].length, 1);
  t.equal(res[1][0].type, 'tag');
  t.equal(res[1][0].name, 'p');
});

test('splitTreeAtElse(tree) :: middle', function(t) {
  t.plan(7);

  var tree = Object.assign({ }, defTree, { 
    attrs: { }, 
    children: [
      { type: 'tag', name: 'div' },
      { type: 'helper', name: 'Else' },
      { type: 'tag', name: 'p' }
    ]
  });

  var res = splitTreeAtElse(tree);

  t.equal(res.length, 2);

  t.equal(res[0].length, 1);
  t.equal(res[0][0].type, 'tag');
  t.equal(res[0][0].name, 'div');

  t.equal(res[1].length, 1);
  t.equal(res[1][0].type, 'tag');
  t.equal(res[1][0].name, 'p');
});


test('splitTreeAtElse(tree) :: end', function(t) {
  t.plan(5);

  var tree = Object.assign({ }, defTree, { 
    attrs: { }, 
    children: [
      { type: 'tag', name: 'div' },
      { type: 'helper', name: 'Else' }
    ]
  });

  var res = splitTreeAtElse(tree);

  t.equal(res.length, 2);
  t.equal(res[1].length, 0);

  t.equal(res[0].length, 1);
  t.equal(res[0][0].type, 'tag');
  t.equal(res[0][0].name, 'div');
});


test('splitTreeAtElse(tree) :: only', function(t) {
  t.plan(3);

  var tree = Object.assign({ }, defTree, { 
    attrs: { }, 
    children: [
      { type: 'helper', name: 'Else' }
    ]
  });

  var res = splitTreeAtElse(tree);

  t.equal(res.length, 2);
  t.equal(res[0].length, 0);
  t.equal(res[1].length, 0);
});