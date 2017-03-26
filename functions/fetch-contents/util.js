
const cheerio = require('cheerio');
const compose = require('ramda/src/compose');
const getTests = require('./tests');

const HEADERS = {
    'Access-Control-Allow-Origin': '*',
};

const removeElems = exports.removeElems = selector => $content =>
    $content.find(selector).remove().end();

const removeAttrsFrom = (tag, attrs) => ($content) => {
    const $tag = $content.find(tag);
    attrs.forEach(attr => $tag.removeAttr(attr));
    return $tag.end();
};

const setAttributesTo = (tag, attrs) => ($content) => {
    const $tag = $content.find(tag);
    Object.keys(attrs)
        .forEach(name => $tag.attr(name, attrs[name]));
    return $tag.end();
};

const removeEmptyParagraphs = $content => $content
    .find('p')
    .filter(function filter() {
        return cheerio(this).text().trim() === '';
    })
    .remove()
    .end()
    .end();

exports.getArticleUrl = (event) => {
    try {
        return JSON.parse(event.body).url;
    } catch (e) {
        return null;
    }
};

exports.getCompleteViewUrl = (articleUrl, hostname) => {
    /* eslint "prefer-template": 0 */
    const tests = getTests();
    if (tests.zeit(hostname) &&
        articleUrl.indexOf('komplettansicht') === -1) {
        return articleUrl.replace(/\/$/, '') + '/komplettansicht';
    }
    if (tests.faz(hostname)) {
        const fazDesktopUrl = articleUrl.replace('://m.faz', '://www.faz');
        if (fazDesktopUrl.indexOf('printPagedArticle=true') === -1) {
            const result = fazDesktopUrl + (fazDesktopUrl.indexOf('?') > -1 ? '&' : '?') +
                'printPagedArticle=true';
            return result;
        }
        return fazDesktopUrl;
    }
    if (tests.spiegel(hostname)) {
        return articleUrl.replace('://m.spiegel', '://www.spiegel');
    }
    if (tests.nytimes(hostname)) {
        return articleUrl.replace('://mobile.nytimes', '://www.nytimes');
    }
    if (tests.taz(hostname)) {
        return articleUrl.replace('://m.taz', '://taz').replace(';m', '');
    }
    return articleUrl;
};

exports.getResponse = body => ({
    statusCode: 200,
    headers: HEADERS,
    body: JSON.stringify(body),
});

/* eslint "comma-dangle": 0 */
exports.basicManipulations = compose(
    removeAttrsFrom('a', [
        'class',
        'data-rtr-id',
        'data-pagetype',
        'shape',
        'data-link-name',
        'data-component',
        'itemscope',
        'itemprop',
    ]),
    setAttributesTo('a', {
        target: '_blank',
        rel: 'noopener noreferrer',
    }),
    removeAttrsFrom('p', [
        'id',
        'xmlns',
        'data-para-count',
        'data-total-count',
    ]),
    removeElems('script'),
    removeElems('meta'),
    removeEmptyParagraphs);
