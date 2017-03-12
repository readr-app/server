
const cheerio = require('cheerio');
const util = require('../util');

exports.NAME = 'Spiegel.de';

exports.COLOR = '#990000';

exports.REGEXP = /^((www|m)\.spiegel|spon)\.de$/i;

exports.getContent = ($, hostname) => {
    const $wrap = cheerio('<div></div>');
    const title = $('h1').eq(0).text().trim();
    const intro = $('.article-intro').eq(0).text().trim();
    util.basicManipulations($('.article-section').eq(0))
        .find('a')
        .attr('href', (i, href) =>
            `//${hostname}${href}`)
        .end()
        .find('p')
        .filter(elem =>
            !elem.className ||
                elem.className.indexOf('obfuscated') === -1)
        .removeAttr('class')
        .appendTo($wrap);
    const content = $wrap.html();
    return { title, intro, content };
};
