'use strict';

const fs = require('fs');
const split = require('split');
const turf = require('turf');

function geojsonStreamCentroid(inputFile, outputFile) {
    const promise = new Promise((resolve, reject) => {

        if (!inputFile) {
            console.log('\nUsage: node index.js --input <path to line delimited GeoJSON Features>\n');

            return reject(new Error('--input argument needed'));
        }
        if (!outputFile) {
            outputFile = inputFile.split('.')[0] + '-centroid.geojson';
        }
        if (fs.existsSync(outputFile)) {
            fs.unlinkSync(outputFile);
        }

        const inputStream = fs.createReadStream(inputFile, {encoding: 'utf8'}).pipe(split());
        inputStream.on('data', (chunk) => {
            if (chunk) {
                const feature = JSON.parse(chunk);
                const featureCentroid = turf.centroid(feature);
                featureCentroid.properties['parent'] = feature;
                fs.appendFileSync(outputFile, JSON.stringify(featureCentroid) + '\n', {encoding: 'utf8'});
            }
        });
        inputStream.on('end', () => {
            console.log('Centroids written to', outputFile);
            return resolve();
        });
    });

    return promise;
}

module.exports = geojsonStreamCentroid;
