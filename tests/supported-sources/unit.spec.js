
const test = require('tape');
const supportedSources = require('../../functions/supported-sources/');

const expected = [
    'BBC.com',
    'FAZ.de',
    'NYTimes.com',
    'Spiegel.de',
    'Sueddeutsche.de',
    'taz.de',
    'TheGuardian.com',
    'WashingtonPost.com',
    'Zeit.de',
];

test('#supportedSources', ({ deepEqual, end }) => {
    deepEqual(supportedSources(), expected);
    end();
});
