var test = require('tape');

const defTree = {
  type: 'component',
  name: 'Each',
  attrs: { },
  children: [{ type: 'tag', name: 'div' }]
};


var Each = require('../dist').Each;

test('<Each data={undefined}><div /></Each>', function(t) {
  t.plan(1);

  var tree = Object.assign({ }, defTree, { 
    data: undefined, 
    attrs: { }
  });

  var res = Each(tree);

  t.equal(res === undefined, true);
});

test('<Each data={emptyArray}><div /></Each>', function(t) {
  t.plan(1);

  var tree = Object.assign({ }, defTree, { 
    data: [], 
    attrs: { }
  });

  var res = Each(tree);

  t.equal(res.length, 0);
});

test('<Each data={emptyObject}><div /></Each>', function(t) {
  t.plan(1);

  var tree = Object.assign({ }, defTree, { 
    data: { }, 
    attrs: { }
  });

  var res = Each(tree);

  t.equal(res.length, 0);
});

test('<Each data={nonEmptyArray}><div /></Each>', function(t) {
  t.plan(11);

  var tree = Object.assign({ }, defTree, { 
    data: ['a', 'b', 'c'], 
    attrs: { }
  });

  var res = Each(tree);

  t.equal(res.length, 3);

  t.equal(res[0].type, 'frame');
  t.equal(res[0].locals['@index'], 0);
  t.equal(res[0].locals['@item'], 'a');
  t.equal(res[0].locals['@length'], res.length);
  t.equal(res[0].children[0].type, 'tag');
  t.equal(res[0].children[0].name, 'div');

  t.equal(res[1].locals['@index'], 1);
  t.equal(res[1].locals['@item'], 'b');

  t.equal(res[2].locals['@index'], 2);
  t.equal(res[2].locals['@item'], 'c');
});

test('<Each data={nonEmptyObject}><div /></Each>', function(t) {
  t.plan(13);

  var tree = Object.assign({ }, defTree, { 
    data: { a: 'aaa', b: 'bbb', c: 'ccc' }, 
    attrs: { }
  });

  var res = Each(tree);

  t.equal(res.length, 3);

  t.equal(res[0].type, 'frame');
  t.equal(res[0].locals['@index'], 0);
  t.equal(res[0].locals['@key'], 'a');
  t.equal(res[0].locals['@length'], res.length);
  t.equal(res[0].children[0].type, 'tag');
  t.equal(res[0].children[0].name, 'div');

  t.equal(res[1].locals['@index'], 1);
  t.equal(res[1].locals['@key'], 'b');
  t.equal(res[1].locals['@item'], 'bbb');

  t.equal(res[2].locals['@index'], 2);
  t.equal(res[2].locals['@key'], 'c');
  t.equal(res[2].locals['@item'], 'ccc');
});


var arrayMap = require('../dist/Each').arrayMap;

test('tree.arrayMap(a, 0) :: with attrs.as', function(t) {
  t.plan(4);

  var tree = Object.assign({ }, defTree, { 
    data: ['a', 'b', 'c'], 
    attrs: { as: 'letter' }
  });

  var res = arrayMap.call(tree, 'b', 1);

  t.equal(res.type, 'frame');
  t.equal(res.locals['@index'], 1);
  t.equal(res.locals['@length'], 3);
  t.equal(res.locals['letter'], 'b');
});

var objectMap = require('../dist/Each').objectMap;

test('tree.objectMap(key:b, 2)', function(t) {
  t.plan(4);

  var tree = Object.assign({ }, defTree, { 
    data: { a: 'aaa', b: 'bbb', c: 'ccc' }, 
    attrs: { }
  });

  var res = objectMap.call(tree, 'b', 1);

  t.equal(res.type, 'frame');
  t.equal(res.locals['@length'], 3);
  t.equal(res.locals['@key'], 'b');
  t.equal(res.locals['@item'], 'bbb');
});
