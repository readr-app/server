
const requireAll = require('require-all');
const generic = require('./generic');

const filterFn = filename =>
    filename.indexOf('index.js') === -1 &&
    filename.indexOf('generic.js') === -1 &&
    filename;

const mapFn = filename => filename.replace('.js', '');

const sources = requireAll({
    dirname: __dirname,
    filter: filterFn,
    map: mapFn,
    recursive: false,
});

const find = obj => fn => Object.keys(obj).reduce((source, key) => {
    if (source) {
        return source;
    }
    if (fn(obj[key], key)) {
        return obj[key];
    }
    return null;
}, null);

const map = obj => fn => Object.keys(obj).reduce((acc, key) =>
    Object.assign({}, acc, {
        [key]: fn(obj[key], key),
    }), {});

const names = Object.keys(sources).reduce((acc, source) =>
    acc.concat([sources[source].NAME]), []);

const base = Object.create({
    find: find(sources),
    map: map(sources),
    generic,
    names,
});

module.exports = Object.assign(base, sources);
