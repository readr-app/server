
const cheerio = require('cheerio');
const util = require('../util');

exports.NAME = 'NYTimes.com';

exports.COLOR = '#326891';

exports.REGEXP = /^(www|mobile)\.nytimes\.com$/i;

exports.getContent = ($) => {
    const $wrap = cheerio('<div></div>');
    const title = $('#headline').eq(0).text().trim();
    const intro = '';
    const $content = $('div.story-body')
        .find('.story-ad ad')
        .remove()
        .end()
        .find('.ad-placeholder')
        .remove()
        .end();
    util.basicManipulations($content)
        .find('p:not(.story-print-citation)')
        .removeAttr('class')
        .appendTo($wrap);
    const content = $wrap.html();
    return { title, intro, content };
};
