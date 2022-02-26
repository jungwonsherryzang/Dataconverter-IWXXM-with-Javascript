#!/bin/bash -e

import xml4json from '../lib/xml4json';

var SCHEMAS = {
  'http://www.example.org/Other1': './tests/other/test1.xsd',
  //'http://www.example.org/Other2': './tests/other/test2.xsd'
};

xml4json({
  downloadSchemas: false,
  trim: true
}, SCHEMAS);