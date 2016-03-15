var test = require('tape');
var Children = require('../dist').Children;

var Heading = require('./fixtures/templates.json').Heading;
var Link = require('./fixtures/templates.json').Link;

test('<Children /> :: with children', function(t) {
  t.plan(2);

  var res = Children({ type: Heading, children: Link });

  t.equal(res.type, Link.type);
  t.equal(res.name, Link.name);
});

test('<Children /> :: without children', function(t) {
  t.plan(1);

  var res = Children({ type: Heading });

  t.equal(res === undefined, true);
});