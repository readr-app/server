
const getTests = require('./tests');

const DEFAULT_COLOR = '#3f51b5';

module.exports = () => (hostname) => {
    /* eslint "global-require": 0 */
    const tests = getTests();
    const source = require('./sources/').find((_, name) =>
        tests[name](hostname));
    if (source) {
        return source.COLOR;
    }
    return DEFAULT_COLOR;
};
