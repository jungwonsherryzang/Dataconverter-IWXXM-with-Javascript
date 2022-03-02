# Dataconverter IWXXM with Typescript/Javascript
Developing a data converter that converts XML to JSON and vice versa for an air traffic management dealing with weather data

IWXXM that stands for ICAO Meteorogical Information eXchange Model is a data format for aviation weather information in XML/GML and it is specificed in both XML Schema and Schematron. 

IWXXM includes XML/GML-based representations for product standardized in ICAO Annex III and WMO No.49, Vol II. 

It includes METAR/SPECI, TAF, SIGMET, AIRMET, Tropical Cyclone Advisory, Volcanic Ash Advisory and Space Weather Advisory. 

IWXXM products are used for operational exchanged of meteorological information for use in aviation.

## USAGE
``` javascript
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
```
