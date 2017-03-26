
const cheerio = require('cheerio');
const util = require('../util');

const TO_BE_REMOVED = [
    'p.AutorenModul',
    'p.Bildunterschrift',
    'p.Bildbeschreibung',
    'p.vjs-no-js',
    'span.WBHead',
    'span[itemprop="image"]',
];

exports.NAME = 'FAZ.de';

exports.COLOR = '#c60000';

exports.REGEXP = /^(www|m)\.faz\.net$/i;

exports.getContent = ($, hostname) => {
    const $wrap = cheerio('<div></div>');
    const title = $('h1').eq(0).text().trim();
    const intro = $('p[itemprop="description"]').eq(0).text().trim();
    const $content = $('div[itemprop="articleBody"]')
        .find(TO_BE_REMOVED.join(','))
        .remove()
        .end();
    util.basicManipulations($content)
        .find('a')
        .attr('href', (_, href) =>
            `//${hostname}${href}`)
        .end()
        .find('p')
        .removeAttr('class')
        .appendTo($wrap);
    const content = $wrap.html();
    return { title, intro, content };
};
