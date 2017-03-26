
const { https } = require('firebase-functions');
const cors = require('cors')();
const fetchContents = require('./fetch-contents/');
const supportedSources = require('./supported-sources/');

exports.fetchContents = https.onRequest((req, res) => {
    if (req.method !== 'POST') {
        res.status(403).send('Forbidden!');
    }
    return cors(req, res, () => fetchContents(req.body.url, (err, result) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        return res.send(result);
    }));
});

exports.supportedSources = https.onRequest((_, res) =>
    res.json(supportedSources()));
