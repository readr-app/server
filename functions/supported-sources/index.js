
const sources = require('../fetch-contents/sources/');

const sortList = (a, b) => {
    const lcA = a.toLowerCase();
    const lcB = b.toLowerCase();
    if (lcA === lcB) {
        return 0;
    }
    return lcA < lcB ? -1 : 1;
};

module.exports = () => sources.names.sort(sortList);
