
const cheerio = require('cheerio');
const util = require('../util');

exports.NAME = 'Zeit.de';

exports.COLOR = '#313131';

exports.REGEXP = /^www\.zeit\.de$/i;

exports.getContent = ($) => {
    const $wrap = cheerio('<div></div>');
    const title = $('span.article-heading__title, span.title').eq(0).text().trim();
    const intro = $('div.summary, p.excerpt').eq(0).text().trim();
    util.basicManipulations($('div.article-body'))
        .find('br')
        .remove()
        .end()
        .find('p')
        .removeAttr('class')
        .appendTo($wrap);
    const content = $wrap.html();
    return { title, intro, content };
};
