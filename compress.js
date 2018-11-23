const fs = require('fs');
const data = require('./data.json');
const outFile = './public/locations.json';
const locations = [];
data.locations.forEach(location => {
  locations.push({
    t: location.timestampMs,
    l: [location.longitudeE7, location.latitudeE7],
    a: location.accuracy
  });
});
fs.writeFileSync(outFile, JSON.stringify(locations),  'binary');
