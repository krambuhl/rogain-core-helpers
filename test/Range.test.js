var test = require('tape');
var Range = require('../dist').Range;

const defTree = {
  type: 'helper',
  name: 'Range',
  attrs: {},
  children: [{ type: 'tag', name: 'div' }]
};

test('<Range data={undefined}><div /></Range>', function(t) {
  t.plan(1);

  var tree = Object.assign({ }, defTree, { data: undefined, attrs: {} });
  var res = Range(tree, { });

  t.equal(res === undefined, true);
});


test('<Range data={undefined}><div /><Else /><p /></Range>', function(t) {
  t.plan(3);

  var tree = Object.assign({ }, defTree, { 
    data: undefined, 
    attrs: { }, 
    children: [
      { type: 'tag', name: 'div' },
      { type: 'helper', name: 'Else' },
      { type: 'tag', name: 'p' }
    ]
  });

  var res = Range(tree, { });

  t.equal(res.length, 1);
  t.equal(res[0].type, 'tag');
  t.equal(res[0].name, 'p');
});

test('<Range data=123><div /><Else /><p /></Range>', function(t) {
  t.plan(3);

  var tree = Object.assign({ }, defTree, { 
    data: 123, 
    attrs: { }, 
    children: [
      { type: 'tag', name: 'div' },
      { type: 'helper', name: 'Else' },
      { type: 'tag', name: 'p' }
    ]
  });

  var res = Range(tree, { });

  t.equal(res.length, 1);
  t.equal(res[0].type, 'tag');
  t.equal(res[0].name, 'div');
});

test('<Range data=123 min=500><div /><Else /><p /></Range>:: out of range', function(t) {
  t.plan(3);

  var tree = Object.assign({ }, defTree, { 
    data: 123, 
    attrs: { min: 500 }, 
    children: [
      { type: 'tag', name: 'div' },
      { type: 'helper', name: 'Else' },
      { type: 'tag', name: 'p' }
    ]
  });

  var res = Range(tree, { });

  t.equal(res.length, 1);
  t.equal(res[0].type, 'tag');
  t.equal(res[0].name, 'p');
});

test('<Range data=123 max=500><div /><Else /><p /></Range>:: in range', function(t) {
  t.plan(3);

  var tree = Object.assign({ }, defTree, { 
    data: 123, 
    attrs: { max: 500 }, 
    children: [
      { type: 'tag', name: 'div' },
      { type: 'helper', name: 'Else' },
      { type: 'tag', name: 'p' }
    ]
  });

  var res = Range(tree, { });

  t.equal(res.length, 1);
  t.equal(res[0].type, 'tag');
  t.equal(res[0].name, 'div');
});

test('<Range data=123 min=0 max=500><div /><Else /><p /></Range>:: in range', function(t) {
  t.plan(3);

  var tree = Object.assign({ }, defTree, { 
    data: 123, 
    attrs: { min: 0, max: 500 }, 
    children: [
      { type: 'tag', name: 'div' },
      { type: 'helper', name: 'Else' },
      { type: 'tag', name: 'p' }
    ]
  });

  var res = Range(tree, { });

  t.equal(res.length, 1);
  t.equal(res[0].type, 'tag');
  t.equal(res[0].name, 'div');
});
