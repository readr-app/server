
/* eslint "global-require": 0 */

module.exports = () => require('./sources/').map(source =>
    hostname => source.REGEXP.test(hostname));
