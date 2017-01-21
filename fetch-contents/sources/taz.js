
const cheerio = require('cheerio');
const util = require('../util');

exports.NAME = 'taz.de';

exports.COLOR = '#A80A1A';

exports.REGEXP = /^(www\.|m\.)?taz\.de$/i;

exports.getContent = ($) => {
    const $wrap = cheerio('<div></div>');
    const title = $('h1').eq(0).text().trim();
    const intro = $('p.intro').eq(0).text().trim();
    util.basicManipulations($('div.sectbody'))
        .find('p.article')
        .removeAttr('class')
        .appendTo($wrap);
    const content = $wrap.html();
    return { title, intro, content };
};
