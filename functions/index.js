
const { fetch } = require('./fetch-contents/');
const { list } = require('./supported-sources/');

exports.fetchContents = fetch;
exports.supportedSources = list;
