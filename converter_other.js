//import { readFileSync } from 'fs';
//import { inspect } from 'util';
//import { Parser } from 'xml4js';
var fs = require('fs');
var util = require('util');
var xml4js = require('xml4js');

// Most of xml2js options should still work
var options = {};
var parser = new xml4js.Parser(options);


// Default is to not download schemas automatically, so we should add it manually
var xsd = fs.readFileSync('./tests/other/test1.xsd', {encoding: 'utf-8'});
var xml = fs.readFileSync('./tests/other/test1.xml', {encoding: 'utf-8'});


parser.addSchema('http://www.example.com/PO', xsd, function (err, importsAndIncludes) {
    // importsAndIncludes contains schemas to be added as well to satisfy all imports and includes found in schema.xsd


    parser.parseString(xml, function (err, result) {
        console.log(util.inspect(result, false, null));
    });
});