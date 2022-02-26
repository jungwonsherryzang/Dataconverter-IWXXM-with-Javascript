var assertBase = require('assert');
//import { assertBase } from './assert.js';
var util = require('util');
//import * as util from 'util';
var _ = require('underscore');
//import _ from 'underscore';

function assert(condition, message) {
  if (!condition) {
    if (_.isObject(message)) {
      message = util.inspect(message, false, null);
    }
    assertBase(false, message);
  }
}
module.exports = assert;
