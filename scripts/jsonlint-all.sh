#!/bin/bash
echo "Parsing JSON files"
json_files=`find . -name '*.json' | awk '!/node_modules/ && !/app\/components/ {print $1}'`
for file in $json_files; do 
  echo "* $file"; 
  jsonlint $file > /dev/null;
done
