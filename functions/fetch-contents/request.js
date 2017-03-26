
const request = require('request').defaults({ jar: true });
const cheerio = require('cheerio');

const headers = { 'User-Agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)' };

module.exports = (url, cb) =>
    request({ url, headers }, (err, res, body) => {
        if (err) {
            return cb(err);
        }
        if (res.statusCode === 200 && body) {
            return cb(null, cheerio.load(body));
        }
        return null;
    });
