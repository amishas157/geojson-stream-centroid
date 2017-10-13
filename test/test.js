'use strict';

const tape = require('tape');
const geojsonStreamCentroid = require('../index');
const path = require('path');
const fs = require('fs');

tape('Geojson Stream Centroid', (assert) => {
    geojsonStreamCentroid(path.join(__dirname, 'test.json'), path.join(__dirname, 'output.json'))
    .then(() => {
        const output = fs.readFileSync(path.join(__dirname, '/output.json'), 'utf8');
        const testOutput = fs.readFileSync(path.join(__dirname, '/testOutput.json'), 'utf8');
        assert.equals(output, testOutput, 'Correct output');
        assert.end();
    });
});

tape('teardown', function (assert) {
    fs.unlinkSync(path.join(__dirname, '/output.json'));
    assert.end();
});
