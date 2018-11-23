const pako =  require('pako');
const data = require('./public/data.json');
const binaryString = pako.deflate(JSON.stringify(data), { to: 'string' });

const compressedb64 = Buffer.from(binaryString, 'binary').toString('base64');

const backtobinary = Buffer.from(compressedb64, 'base64').toString('binary');

const restored = JSON.parse(pako.inflate(backtobinary, { to: 'string' }));

console.log(compressedb64);