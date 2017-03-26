
const test = require('tape');
const { supportedSources } = require('../../functions/');

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

test('#supportedSources', ({ deepEqual, end }) =>
    // eslint-disable-next-line no-sparse-arrays
    supportedSources(...[,, (_, { body }) => {
        const { sources } = JSON.parse(body);
        deepEqual(sources, expected);
        end();
    }]));
