#!/usr/bin/env node

'use strict';

const geojsonStreamCentroid = require('./index');

const argv = require('minimist')(process.argv.slice(2));

geojsonStreamCentroid(argv.input, argv.output)
.then(() => {
    console.log('Done');
})
.catch((err) => {
    console.log(err);
});
