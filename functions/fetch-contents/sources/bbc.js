
/* eslint "strict": 0 */

'use strict';

const cheerio = require('cheerio');
const compose = require('ramda/src/compose');
const util = require('../util');

exports.NAME = 'BBC.com';

exports.COLOR = '#BB1919';

exports.REGEXP = /^www\.bbc\.(com|co\.uk)$/i;

const selectors = new Map();

selectors.set(/^news\//, {
    title: 'h1.story-body__h1',
    intro: 'p.story-body__introduction',
    content: 'div[property="articleBody"]',
});

selectors.set(/^sport\//, {
    title: 'h1.story-headline',
    intro: 'p.sp-story-body__introduction',
    content: '#story-body',
});

selectors.set(/^(culture|travel|capital|earth|future)\//, {
    title: 'h1.primary-heading',
    intro: 'p.introduction',
    content: 'div.body-content',
});

const getSelectors = (pathname) => {
    /* eslint "no-restricted-syntax": 0, "prefer-const": 0 */
    for (let regexp of selectors.keys()) {
        if (regexp.test(pathname)) {
            return selectors.get(regexp);
        }
    }
    throw Error('The contents of the given URL can not be fetched.');
};

const removeRubbish = compose(
    util.removeElems('figure'),
    util.removeElems('aside'),
    util.removeElems('.bbccom_slot'),
    util.removeElems('.inline-media'));

const prependHostname = hostname => (_, href) => {
    if (href.indexOf(hostname) > -1 || href.indexOf('http') === 0) {
        return href;
    }
    return `//${hostname}${href}`;
};

exports.getContent = ($, hostname, pathname) => {
    const $wrap = cheerio('<div></div>');
    const sel = getSelectors(pathname);
    const title = $(sel.title).eq(0).text().trim();
    const intro = $(sel.intro).eq(0).text().trim();
    const $content = util.removeElems(sel.intro)(removeRubbish($(sel.content).eq(0)));
    util.basicManipulations($content)
        .find('a')
        .attr('href', prependHostname(hostname))
        .end()
        .find('p')
        .appendTo($wrap);
    const content = $wrap.html();
    return { title, intro, content };
};
