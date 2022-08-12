// parse_text_script.js

// if using ES6 Imports uncomment line below
// import {readFileSync, promises as fsPromises} from 'fs';
const {readFileSync, writeFileSync} = require('fs');

// read file SYNCHRONOUSLY
function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/);
  return arr;
}

let data = syncReadFile('./data/us_state_area_mi_2.txt');

let states_array
let data_json = []
data.forEach((datum) => {
  let state_data = datum.split(' ');
  data_json.push({state_name: state_data[0], state_code: state_data[1], state_area_mi2: state_data[state_data.length-1]});
});

writeFileSync('./data/us_state_area_mi_2.json', JSON.stringify(data_json));
