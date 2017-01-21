
const url = require('url');
const md5Hash = require('md5');
const request = require('./request');
const sources = require('./sources/');
const getColors = require('./colors');
const getTests = require('./tests');
const util = require('./util');

const STATUS_OK = 'OK';

const STATUS_ERROR = 'Error';

const getArticleContent = (hostname, $) => {
    const tests = getTests();
    const source = sources.find((_, name) =>
        tests[name](hostname));
    if (source) {
        return source.getContent($, hostname);
    }
    return sources.generic.getContent($);
};

exports.fetch = (event, context, callback) => {

    const getArticleColor = getColors();
    const articleUrl = util.getArticleUrl(event);

    if (!articleUrl) {
        return callback(null, util.getResponse({
            status: STATUS_ERROR,
            message: 'Please provide an article-URL',
        }));
    }

    const urlParts = url.parse(articleUrl);
    const articleHostname = urlParts.hostname;
    const articlePathname = urlParts.pathname.replace(/^\/|\/$/g, '');
    const completeUrl = util.getCompleteViewUrl(articleUrl, articleHostname);

    return request(completeUrl, (err, $) => {
        if (err) {
            return callback(err);
        }

        return callback(null, util.getResponse(Object.assign({
            status: STATUS_OK,
            color: getArticleColor(articleHostname),
            id: md5Hash(articlePathname),
        }, getArticleContent(articleHostname, $))));

    });

};
