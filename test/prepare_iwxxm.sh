#!/bin/bash 

XML4JSON_IWXXM="./tests/convertiwxxm.js"


function download() {
    local url="$1"
    local filename="./tests/output/$2"

    if [ ! -e "$filename" ]; then
        wget "--output-document=$filename" "$url"
        sleep 20
    fi
}

function convertIWXXM() {
    local basename="./tests/output/$1"
    local output

    if [ ! -e "$basename.json" ]; then
        echo "Converting $basename.xml to $basename.json"
        output=$(cat "$basename.xml" | $XML4JSON_IWXXM)
        echo "$output" > "$basename.json"
    fi
}



download "http://schemas.wmo.int/iwxxm/3.0/airmet.xsd" "airmet.xsd"
download "http://schemas.wmo.int/iwxxm/3.0/common.xsd" "common.xsd"
download "http://schemas.wmo.int/iwxxm/3.0/iwxxm-collect.xsd" "iwxxm-collect.xsd"
download "http://schemas.wmo.int/iwxxm/3.0/iwxxm.xsd" "iwxxm.xsd"
download "http://schemas.wmo.int/iwxxm/3.0/measures.xsd" "measures.xsd"
download "http://schemas.wmo.int/iwxxm/3.0/metFeature.xsd" "metFeature.xsd"
download "http://schemas.wmo.int/iwxxm/3.0/metarSpeci.xsd" "metarSpeci.xsd"
download "http://schemas.wmo.int/iwxxm/3.0/sigmet.xsd" "sigmet.xsd"
download "http://schemas.wmo.int/iwxxm/3.0/spaceWxAdvisory.xsd" "spaceWxAdvisory.xsd"
download "http://schemas.wmo.int/iwxxm/3.0/taf.xsd" "taf.xsd"
download "http://schemas.wmo.int/iwxxm/3.0/tropicalCycloneAdvisory.xsd" "tropicalCycloneAdvisory.xsd"
download "http://schemas.wmo.int/iwxxm/3.0/volcanicAshAdvisory.xsd" "volcanicAshAdvisory.xsd"





for PREFIX in A6-1a-TS translation-failed; do
    download "https://schemas.wmo.int/iwxxm/3.0/examples/airmet-$PREFIX" "airmet-$PREFIX.xml"
done

for PREFIX in A3-1 EDDF-runwaystate LKKV NIL-collect translation-failed; do
    download "https://schemas.wmo.int/iwxxm/3.0/examples/metar-$PREFIX" "metar-$PREFIX.xml"
done

for PREFIX in A6-1a-TS A6-1b-CNL A6-2-TC multi-location-VA translation-failed-collect VA-EGGX; do
    download "https://schemas.wmo.int/iwxxm/3.0/examples/sigmet-$PREFIX" "sigmet-$PREFIX.xml"
done

for PREFIX in A2-3 A2-4 A2-5 translation-failed; do
    download "https://schemas.wmo.int/iwxxm/3.0/examples/spacewx-$PREFIX" "spacewx-$PREFIX.xml"
done

for PREFIX in A3-2; do
    download "https://schemas.wmo.int/iwxxm/3.0/examples/speci-$PREFIX" "speci-$PREFIX.xml"
done

for PREFIX in A5-1 A5-2 NIL-collect translation-failed; do
    download "https://schemas.wmo.int/iwxxm/3.0/examples/taf-$PREFIX" "taf-$PREFIX.xml"
done

for PREFIX in A2-2 translation-failed; do
    download "https://schemas.wmo.int/iwxxm/3.0/examples/tc-advisory-$PREFIX" "tc-advisory-$PREFIX.xml"
done

for PREFIX in A2-1 translation-failed; do
    download "https://schemas.wmo.int/iwxxm/3.0/examples/va-advisory-$PREFIX" "va-advisory-$PREFIX.xml"
done



download "http://www.aixm.aero/schema/5.1.1_profiles/AIXM_WX/5.1.1b/AIXM_Features.xsd" "AIXM_Features.xsd"
download "http://schemas.opengis.net/gml/3.2.1/gml.xsd" "gml.xsd"
download "http://www.w3.org/1999/xlink.xsd" "xlink.xsd"
download "https://schemas.wmo.int/collect/1.2/collect.xsd" "collect.xsd"
download "http://schemas.wmo.int/metce/1.2/metce.xsd" "metce.xsd"

download "https://www.aixm.aero/schema/5.1.1_profiles/AIXM_WX/5.1.1b/AIXM_DataTypes.xsd" "AIXM_DataTypes.xsd"
download "https://www.aixm.aero/schema/5.1.1_profiles/AIXM_WX/5.1.1b/AIXM_AbstractGML_ObjectTypes.xsd" "AIXM_AbstractGML_ObjectTypes.xsd"




convertIWXXM "airmet-A6-1a-TS"
convertIWXXM "airmet-translation-failed"
convertIWXXM "metar-A3-1"
convertIWXXM "metar-EDDF-runwaystate"
convertIWXXM "metar-LKKV"
convertIWXXM "metar-NIL-collect"
convertIWXXM "metar-translation-failed"
convertIWXXM "sigmet-A6-1a-TS"
convertIWXXM "sigmet-A6-1b-CNL"
convertIWXXM "sigmet-A6-2-TC"
convertIWXXM "sigmet-multi-location-VA"
convertIWXXM "sigmet-translation-failed-collect"
convertIWXXM "sigmet-VA-EGGX"
convertIWXXM "spacewx-A2-3"
convertIWXXM "spacewx-A2-4"
convertIWXXM "spacewx-A2-5"
convertIWXXM "spacewx-translation-failed"
convertIWXXM "speci-A3-2"
convertIWXXM "taf-A5-1"
convertIWXXM "taf-A5-2"
convertIWXXM "taf-NIL-collect"
convertIWXXM "taf-translation-failed"
convertIWXXM "tc-advisory-A2-2"
convertIWXXM "tc-advisory-translation-failed"
convertIWXXM "va-advisory-A2-1"
convertIWXXM "va-advisory-translation-failed"
