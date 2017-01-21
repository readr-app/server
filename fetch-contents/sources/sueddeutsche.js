
const cheerio = require('cheerio');
const util = require('../util');

exports.NAME = 'Sueddeutsche.de';

exports.COLOR = '#009900';

exports.REGEXP = /^www\.sueddeutsche\.de$/i;

exports.getContent = ($) => {
    const $wrap = cheerio('<div></div>');
    const title = $('h1').eq(0).text().trim();
    const intro = $('p.article.entry-summary').eq(0).text().trim();
    const $content = $('#article-body')
        .find('p.anzeige')
        .remove()
        .end()
        .find('p.article.entry-summary')
        .remove()
        .end();
    util.basicManipulations($content)
        .find('p')
        .removeAttr('class')
        .appendTo($wrap);
    const content = $wrap.html();
    return { title, intro, content };
};
