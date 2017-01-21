
const cheerio = require('cheerio');
const util = require('../util');

const getContentWrap = ($) => {
    const $openGraph = $('div[itemprop="articleBody"]');
    const $generic = cheerio('<div></div>');
    if ($openGraph.length) {
        return util.basicManipulations($openGraph);
    }
    $('p').appendTo($generic);
    return util.basicManipulations($generic);
};

exports.getContent = ($) => {
    const $wrap = cheerio('<div></div>');
    const title = $('meta[property="og:title"]').eq(0).attr('content').trim();
    const intro = $('meta[property="og:description"]').eq(0).attr('content').trim();
    getContentWrap($)
        .find('p')
        .appendTo($wrap);
    const content = $wrap.html();
    return { title, intro, content };
};
