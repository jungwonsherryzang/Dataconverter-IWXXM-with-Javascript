# Dataconverter IWXXM with Javascript
Developing a data converter that converts XML to JSON and vice versa for an air traffic management dealing with weather data

IWXXM that stands for ICAO Meteorogical Information eXchange Model is a data format for aviation weather information in XML/GML and it is specificed in both XML Schema and Schematron. 

IWXXM includes XML/GML-based representations for product standardized in ICAO Annex III and WMO No.49, Vol II. 

It includes METAR/SPECI, TAF, SIGMET, AIRMET, Tropical Cyclone Advisory, Volcanic Ash Advisory and Space Weather Advisory. 

IWXXM products are used for operational exchanged of meteorological information for use in aviation.

## IWXXM data example
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<schema elementFormDefault="qualified" targetNamespace="http://icao.int/iwxxm/3.0" version="3.0.0" 
xmlns:iwxxm="http://icao.int/iwxxm/3.0" xmlns:gml="http://www.opengis.net/gml/3.2" xmlns="http://www.w3.org/2001/XMLSchema">
	<include schemaLocation="measures.xsd"></include>
	<include schemaLocation="common.xsd"></include>
	<include schemaLocation="spaceWxAdvisory.xsd"></include>
	<include schemaLocation="volcanicAshAdvisory.xsd"></include>
	<include schemaLocation="tropicalCycloneAdvisory.xsd"></include>
	<include schemaLocation="airmet.xsd"></include>
	<include schemaLocation="sigmet.xsd"></include>
	<include schemaLocation="taf.xsd"></include>
	<include schemaLocation="metarSpeci.xsd"></include>
	<import namespace="http://www.opengis.net/gml/3.2" schemaLocation="http://schemas.opengis.net/gml/3.2.1/gml.xsd"></import>
	<annotation>
		<documentation>The ICAO Meteorological Information Exchange Model (IWXXM) package, including METAR, SPECI, TAF, and other reports as defined in ICAO Annex 3. 
IWXXM reports are essential operational meteorology products used to enable safe and efficient air travel worldwide.
The report types in this package include METAR, SPECI, TAF, SIGMET, AIRMET, Volcanic Ash Advisory (VAA), Tropical Cyclone Advisory (TCA), and Space Weather Advisory.
This package builds upon the ISO 19100 family (ISO TC211) and WMO standard meteorological modeling constructs. 
Additionally, the constructs in this application schema refer to a number of aviation constructs such Runway and Airspace from AIXM.  
The full relationship of this package with external dependencies are shown in the 'Package Dependencies' diagram.
Not all of the reports types from Annex 3 are currently represented, this may be expanded in a future version.
References to WMO and ICAO Technical Regulations within this XML schema shall have no formal status and are for information purposes only. 
Where there are differences between the Technical Regulations and the schema, the Technical Regulations shall take precedence.  
Technical Regulations may impose requirements that are not described in this schema.</documentation>
		<appinfo>
			<gml:gmlProfileSchema>gmliwxxm.xsd</gml:gmlProfileSchema>
		</appinfo>
	</annotation>
</schema>
```

## INSTALLATION
Use npm to install xml4js package:
```
npm install xml4js
```

### USAGE
``` javascript
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
        console.dir(result);
        var json = JSON.stringify(result, null, 2);

        fs.writeFileSync('./tests/output_iwxxm/airmet-A6-1a-TS.json', json);
    });
});
```

### READ AND WRITE FILE
``` javascript
//Using readFileSync to read file
var xsd = fs.readFileSync('./tests/xsd/IWXXM/airmet.xsd', {encoding: 'utf-8'});
var xml = fs.readFileSync('./tests/xml/IWXXM/airmet-A6-1a-TS.xml', {encoding: 'utf-8'});

//Using writeFileSync to save converted file as JSON file
fs.writeFileSync('./tests/output_iwxxm/airmet-A6-1a-TS.json', json);
```

### OUTCOME

airmet-A6-1a-TS.json

Packeage builds upon node-xml2js, detects and parses XML Schema that is used to transform Javascript Object into a consistent schema-driven structure.
It maps attributes to $ field and values to _ field.
from. https://github.com/peerlibrary/node-xml4js

``` json
"iwxxm:AIRMET": {
    "$": {
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "xmlns:gml": "http://www.opengis.net/gml/3.2",
      "xmlns:iwxxm": "http://icao.int/iwxxm/3.0",
      "xmlns:aixm": "http://www.aixm.aero/schema/5.1.1",
      "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "xsi:schemaLocation": "http://icao.int/iwxxm/3.0 http://schemas.wmo.int/iwxxm/3.0/iwxxm.xsd",
      "gml:id": "uuid.69a2497b-193c-47bf-a6bd-1cc71acbc8e5",
      "reportStatus": "NORMAL",
      "permissibleUsage": "OPERATIONAL"
    },
    "iwxxm:issueTime": [
      {
        "gml:TimeInstant": [
          {
            "$": {
              "gml:id": "uuid.6ffb87f7-6eef-4bae-b4f2-016e2951d7dd"
            },
            "gml:timePosition": [
              "2014-05-15T15:20:00Z"
            ]
          }
        ]
      }
    ],
    "iwxxm:issuingAirTrafficServicesUnit": [
      {
        "aixm:Unit": [
          {
            "$": {
              "gml:id": "uuid.1b54b36f-bc16-4111-abb6-05ff6aad744b"
            },
            "aixm:timeSlice": [
              {
                "aixm:UnitTimeSlice": [
                  {
                    "$": {
                      "gml:id": "uuid.91cf4ebe-8687-432f-a1e1-aaf7ebc053b2"
                    },
```



