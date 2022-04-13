var fs = require('fs');
var util = require('util');
var xml4js = require('./xml4js'); 


// Most of xml2js options should still work
var options = {};
var parser = new xml4js.Parser(options);
var parseString = require('xml2js').parseString;

// Adding it manually
var xsd = fs.readFileSync('./tests/xsd/IWXXM/airmet.xsd', {encoding: 'utf-8'});
var xml = fs.readFileSync('./tests/xml/IWXXM/airmet-translation-failed.xml', {encoding: 'utf-8'});


parser.addSchema('http://icao.int/iwxxm/3.0', xsd, function (err, importsAndIncludes) { 
    //importsAndIncludes contains schemas to be added as well to satisfy all imports and includes found in xsd file
    //converting
    parseString(xml, function (err, result) {
        console.log(util.inspect(result, false, null)); //displays the whole result
        console.dir(result);
        var json = JSON.stringify(result, null, 2);

        fs.writeFileSync('./tests/output_iwxxm/1.json', json);
    });
});
