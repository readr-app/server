
const cheerio = require('cheerio');
const util = require('../util');

const getTitle = $ => [
    $('meta[property="og:title"]').eq(0).attr('content'),
    $('meta[name="twitter:title"]').eq(0).attr('content'),
    $('title').eq(0).text(),
].reduce((prev, title) => {
    if (typeof prev === 'string') {
        return prev;
    }
    return title;
}) || '';

const getIntro = $ => [
    $('meta[property="og:description"]'),
    $('meta[name="twitter:description"]'),
    $('meta[name="description"]'),
].reduce((prev, $intro) => {
    if (typeof prev === 'string') {
        return prev;
    }
    return $intro.eq(0).attr('content');
}) || '';

const getContentWrap = ($) => {
    // Get rid of parts we don't need at all.
    $('header, aside, footer, form').remove();
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
    const title = getTitle($).trim();
    const intro = getIntro($).trim();
    getContentWrap($)
        .find('p')
        .appendTo($wrap);
    const content = $wrap.html();
    return { title, intro, content };
};
