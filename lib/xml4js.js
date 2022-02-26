//import * as parser from './parser.js';
//import _ from 'underscore';

var parser = require('./parser');
var _ = require('underscore');

function parseString(str, a, b) {
  var cb, options;
  // We want != here
  if (b != null) {
    if (isFunction(b)) {
      cb = b;
    }
    if (isObject(a)) {
      options = a;
    }
  }
  else {
    if (isFunction(a)) {
      cb = a;
    }
    options = {};
  }
  new parser.Parser(options).parseString(str, cb); //new Parser(options).parseString(str, cb);
}

exports.parseString = parseString;
exports.Parser = parser.Parser;