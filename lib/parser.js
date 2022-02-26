var async = require('async');
//import * as async from 'async';
var xml2js = require('xml2js');
//import * as xml2js from 'xml2js';
var _ = require('underscore');
//import _ from 'underscore';


var multivalue = require('./multivalue');
//import * as multivalue from './multivalue.js';
var validator = require('./validator');
//import * as validator from './validator.js';
var xsd = require('./xsd');
//import * as xsd from './xsd.js';

//var async = require('async');
//var xml2js = require('xml2js');
//var _ = require('underscore');

//var multivalue = require('./multivalue');
//var validator = require('./validator');
//var xsd = require('./xsd');

function Parser(options) {
  var self = this;

  options = _.defaults(options, {    
    downloadSchemas: false,
    outputWithNamespace: false
  });


  options.explicitRoot = true;

  options.explicitArray = true;
 
  options.xmlns = true;
 
  options.validator = validator.validator;

  options.parser = self;

  xml2js.Parser.call(self, options);


  // A multi-value dict of namespace URLs and schema contents
  self.parsedSchemas = {};
  // A multi-value dict of namespace URLs and schema URLs
  self.downloadedSchemas = {};

  self.attributes = {};
  self.elements = {};
  self.types = _.clone(xsd.BASE_TYPES);

  return self;
}

Parser.prototype = Object.create(xml2js.Parser.prototype);
Parser.prototype.constructor = Parser;

_.extend(Parser.prototype, validator.ValidatorMixin);
_.extend(Parser.prototype, xsd.XsdMixin);

function populateSchemas(parser, str, cb) {
  parser.findSchemas(str, function (err, foundSchemas) {
    if (err) {
      cb(err);
      return;
    }

    if (parser.options.downloadSchemas) {
      // We do a breadth-first traversal of schemas to prevent possible infinite loops
      async.until(function () {
        return _.isEmpty(foundSchemas);
      }, function (cb) {
        var schemas = foundSchemas;
        foundSchemas = {};
        async.each(_.keys(schemas), function (namespaceUrl, cb) {
          async.each(schemas[namespaceUrl], function (schemaUrl, cb) {
            parser.downloadAndAddSchema(namespaceUrl, schemaUrl, function (err, importsAndIncludes) {
              if (err) {
                cb(err);
                return;
              }

              _.each(importsAndIncludes, function (nextSchemaUrls, nextNamespaceUrl) {
                _.each(nextSchemaUrls, function (nextSchemaUrl) {
                  if (!multivalue.hasValue(parser.downloadedSchemas, nextNamespaceUrl, nextSchemaUrl)) {
                    multivalue.addValue(foundSchemas, nextNamespaceUrl, nextSchemaUrl);
                  }
                });
              });

              cb();
            });
          }, cb);
        }, cb);
      }, cb);
    }
    else {
      for (var namespaceUrl in foundSchemas) {
        if (foundSchemas.hasOwnProperty(namespaceUrl)) {
          // It checks only if any schema files were parsed for a given namespaceUrl, not really if they
          // match parsed files (we would have to fetch content to do that properly, which we cannot do)
          if (!parser.parsedSchemas[namespaceUrl]) {
            cb("Schema " + namespaceUrl + " (" + foundSchemas[namespaceUrl].join(", ") + ") unavailable and automatic downloading not enabled");
            return;
          }
        }
      }
      cb();
    }
  });
}

Parser.prototype.parseString = function (str, cb) {
  var self = this;

  populateSchemas(self, str, function (err) {
    if (err) {
      cb(err);
      return;
    }

    xml2js.Parser.prototype.parseString.call(self, str, cb);
  });
};
exports.Parser = Parser;