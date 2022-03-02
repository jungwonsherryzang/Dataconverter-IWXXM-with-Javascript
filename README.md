# Dataconverter IWXXM with Typescript/Javascript
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


### USAGE
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

#### TEST FILE
``` shell 
#!/bin/bash


XML4JSON_IWXXM="./convertiwxxm.js"


EXIT_CODE=0

function test() {
    local suite="$1"
    local program="$2"
    local basename="./$suite/$3"
    local exit_code
    
    echo "Testing $basename.xml to $basename.json"
    cat "$basename.xml" | $program > "$basename.json-test"
    exit_code=$?
    if [ $exit_code -ne 0 ]; then
        echo "Program failed"
        EXIT_CODE=$exit_code
    else
        if ! diff "$basename.json-test" "$basename.json"; then
            echo "Diff failed"
            EXIT_CODE=1
        fi
    fi
    rm -f "$basename.json-test"
}


test "iwxxm" "$XML4JSON_IWXXM" "airmet"
test "iwxxm" "$XML4JSON_IWXXM" "common"
test "iwxxm" "$XML4JSON_IWXXM" "gmliwxxm"
test "iwxxm" "$XML4JSON_IWXXM" "iwxxm"
test "iwxxm" "$XML4JSON_IWXXM" "measures"
test "iwxxm" "$XML4JSON_IWXXM" "metarSpeci"
test "iwxxm" "$XML4JSON_IWXXM" "sigmet"
test "iwxxm" "$XML4JSON_IWXXM" "spaceWxAdvisory"
test "iwxxm" "$XML4JSON_IWXXM" "taf"
test "iwxxm" "$XML4JSON_IWXXM" "tropicalCycloneAdvisory"
test "iwxxm" "$XML4JSON_IWXXM" "volcanicAshAdvisory"

exit $EXIT_CODE
```
