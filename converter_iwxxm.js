var fs = require('fs');
var util = require('util');
var xml4js = require('./xml4js');
var xml2js = require('xml2js');


// Most of xml2js options should still work
var options = {};
var parser = new xml4js.Parser(options);


// Default is not to download schemas automatically, so we should add it manually
var xsd = fs.readFileSync('./tests/xsd/IWXXM/airmet.xsd', {encoding: 'utf-8'});
var xml = fs.readFileSync('./tests/xml/IWXXM/airmet-A6-1a-TS.xml', {encoding: 'utf-8'});

var parseString = require('xml2js').parseString;

parser.addSchema('http://icao.int/iwxxm/3.0', xsd, function (err, importsAndIncludes) { 
    // importsAndIncludes contains schemas to be added as well to satisfy all imports and includes found in xsd file
    
    //convert xml to json
    parseString(xml, function (err, result) {
        //var json = JSON.stringify(result, null, 4);
        console.log(util.inspect(result, false, null));
        console.dir(result.Ffice2Message);
        var json = JSON.stringify(result, null, 2);

        fs.writeFileSync('./tests/output_iwxxm/airmet-A6-1a-TS.json', json);
    });
});
