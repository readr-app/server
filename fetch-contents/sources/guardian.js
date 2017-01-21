
const cheerio = require('cheerio');
const util = require('../util');

exports.NAME = 'TheGuardian.com';

exports.COLOR = '#005689';

exports.REGEXP = /^www\.theguardian\.com$/i;

exports.getContent = ($) => {
    const $wrap = cheerio('<div></div>');
    const title = $('h1.content__headline').eq(0).text().trim();
    const intro = $('meta[itemprop="description"]')
        .eq(0).attr('content').trim();
    util.basicManipulations($('div[itemprop="articleBody"]'))
        .find('p')
        .removeAttr('class')
        .appendTo($wrap);
    const content = $wrap.html();
    return { title, intro, content };
};
