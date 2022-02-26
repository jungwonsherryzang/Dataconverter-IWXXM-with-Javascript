#!/usr/bin/env node

//import * as xml4json from '../lib/xml4json.js';
var xml4json = require('../lib/xml4json');
//import xml4json from '../lib/xml4json';

var SCHEMAS = {
  'http://icao.int/iwxxm/3.0': ['./tests/xsd/IWXXM/airmet.xsd', './tests/xsd/IWXXM/common.xsd', './tests/xsd/IWXXM/iwxxm.xsd',
                                './tests/xsd/IWXXM/measures.xsd', './tests/xsd/IWXXM/metarSpeci.xsd', './tests/xsd/IWXXM/sigmet.xsd',
                                './tests/xsd/IWXXM/spaceWxAdvisory.xsd', './tests/xsd/IWXXM/taf.xsd','./tests/xsd/IWXXM/tropicalCycloneAdvisory.xsd',
                                './tests/xsd/IWXXM/volcanicAshAdvisory.xsd'],
                                
  'http://www.opengis.net/gml/3.2': './tests/xsd/IWXXM/gmliwxxm.xsd',

  //TRY
  'http://www.aixm.aero/schema/5.1.1_profiles/AIXM_WX/5.1.1b/AIXM_Features.xsd': './tests/xsd/IWXXM/AIXM_Features.xsd',
  'http://schemas.opengis.net/gml/3.2.1/gml.xsd': './tests/xsd/IWXXM/gml.xsd',
  'http://www.w3.org/1999/xlink.xsd': './tests/xsd/IWXXM/xlink.xsd',
  'http://schemas.wmo.int/collect/1.2/collect.xsd': './tests/xsd/IWXXM/collect.xsd',
  'http://schemas.wmo.int/metce/1.2/metce.xsd': './tests/xsd/IWXXM/metce.xsd'
};

xml4json({
  downloadSchemas: false
}, SCHEMAS);


