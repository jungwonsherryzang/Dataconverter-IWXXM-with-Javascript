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