
const cheerio = require('cheerio');
const util = require('../util');

exports.NAME = 'WashingtonPost.com';

exports.COLOR = '#1955a5';

exports.REGEXP = /^www\.washingtonpost\.com$/i;

exports.getContent = ($) => {
    const $wrap = cheerio('<div></div>');
    const title = $('h1[itemprop="headline"]').eq(0).text().trim();
    const intro = '';
    const $content = $('article[itemprop="articleBody"]')
        .find('.interstitial-link, [channel="wp.com"]')
        .remove()
        .end()
        .find('div.extra')
        .remove()
        .end();
    util.basicManipulations($content)
        .find('p')
        .removeAttr('class')
        .appendTo($wrap);
    const content = $wrap.html();
    return { title, intro, content };
};
