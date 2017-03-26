
const jsdom = require('jsdom').jsdom;
const Readability = require('readability/index').Readability;
const cheerio = require('cheerio');
const util = require('../util');

const createUri = (hostname, pathname) => ({
    spec: `http://${hostname}/${pathname}`,
    host: hostname,
    prePath: `http://${hostname}`,
    scheme: 'http',
    pathBase: `http://${hostname}/${pathname.split('/').slice(0, -1).join('/')}`,
});

exports.getContent = ($, hostname, pathname) => {
    const $wrap = cheerio('<div></div>');
    const doc = jsdom($.html(), {
        features: {
            FetchExternalResources: false,
            ProcessExternalResources: false,
        },
    });
    const uri = createUri(hostname, pathname);
    const reader = new Readability(uri, doc);
    const result = reader.parse();
    const title = result.title;
    const intro = '';
    util.basicManipulations(
        cheerio.load(result.content)('div.page'))
            .find('p')
            .removeAttr('style')
            .removeAttr('class')
            .appendTo($wrap);
    const content = $wrap.html();
    return { title, intro, content };
};
