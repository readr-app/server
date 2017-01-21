
const test = require('tape');
const fetchContents = require('../../fetch-contents/');

const cases = {};

cases['http://www.volksstimme.de/lokal/schoenebeck/kreis-gegen-ameos-erster-streit-nun-beigelegt'] = {
    name: 'generic',
    id: '5059f5295cb7cecfed0e7beb60b98742',
    color: '#3f51b5',
    title: 'Erster Streit nun beigelegt',
    intro: 'Etappensieg f�r den Salzlandkreis: Das Oberlandesgericht Naumburg hat ein wegweisendes Urteil gesprochen.',
};

cases['http://www.spiegel.de/politik/ausland/john-lewis-buergerrechtler-bezeichnet-trump-als-illegitimen-praesidenten-a-1130038.html'] = {
    name: 'spiegel',
    id: '1e1521735c5162e99b9a11ac94dbdb2b',
    color: '#990000',
    title: 'John Lewis: Bürgerrechtler bezeichnet Trump als illegitimen Präsidenten',
    intro: 'Unliebsamer Kritik begegnet Donald Trump oft mit unsachlichen Anschuldigungen. So auch im Fall des Bürgerrechtlers John Lewis. Dessen Wahlkreis sei "kriminalitätsverseucht", twitterte der US-Präsident.',
};

cases['http://www.zeit.de/kultur/2017-01/fake-news-donald-trump-internet-politik-kommunikation-medien'] = {
    name: 'zeit',
    id: 'b32249048c40b484fcd0ed524905bc9f',
    color: '#313131',
    title: 'Alles Fake!',
    intro: 'Tobt wirklich ein Informationsbürgerkrieg? Anstatt Internetkonzerne maßzuregeln und Fake-News zu verbieten, sollten wir die Realität der neuen Medien anerkennen.',
};

cases['http://taz.de/Widerstand-gegen-Trump/!5371495/'] = {
    name: 'taz',
    id: '48ca86e6c822650fe97e91857616b32f',
    color: '#A80A1A',
    title: 'Ausflippen! Jetzt!',
    intro: 'Jeder US-Bürger kann etwas gegen Donald Trumps Weg in den administrativen Terror tun. Und sei es, sich krankschreiben zu lassen.',
};

cases['http://www.sueddeutsche.de/bayern/schriftsteller-wie-ludwig-thoma-vom-linksliberalen-zum-rechten-hetzer-wurde-1.3333119'] = {
    name: 'sueddeutsche',
    id: 'cdd8bb785386c07dbcac4d0e72fb3357',
    color: '#009900',
    title: 'Ludwig Thoma: Rechte Hetzschriften',
    intro: 'Kein bayerischer Dichter ist so populär wie Ludwig Thoma - doch in seinen letzten Lebensjahren rief er unverhohlen zum Mord auf. Es spricht viel dafür, dass sich Hitler Anregungen aus seinen Texten holte.',
};

cases['https://www.theguardian.com/us-news/2017/jan/15/donald-trump-to-hold-summit-with-vladimir-putin-within-weeks'] = {
    name: 'theguardian',
    id: '973d5386e7501bce9048bb803dac245e',
    color: '#005689',
    title: 'Trump and Vladimir Putin to hold summit \'within weeks\'',
    intro: 'President-elect reported to be planning to meet Russian counterpart in Reykjavik shortly after assuming office',
};

cases['http://www.faz.net/aktuell/feuilleton/debatten/regieren-mit-twitter-und-realdonaldtrump-ueber-den-politikstil-der-neuen-amerikanischen-praesidenten-14649272.html'] = {
    name: 'faz',
    id: '53714831a9e941a75535834a22f69d2f',
    color: '#c60000',
    title: 'Regieren mit Twitter und @realDonaldTrump: Über den Politikstil der neuen amerikanischen Präsidenten',
    intro: '@realDonaldTrump: Was wird passieren, wenn der mächtigste Mensch der Welt seine Politik mit Tweets macht? Die vergangenen Wochen gaben einen Vorgeschmack. Über das Regieren mit 140 Zeichen.',
};

cases['https://www.nytimes.com/2017/01/14/business/energy-environment/california-big-batteries-as-power-plants.html'] = {
    name: 'nytimes',
    id: '6078df056dc71b744be15bb1e7c546c3',
    color: '#326891',
    title: 'A Big Test for Big Batteries',
    intro: '',
};

cases['https://www.washingtonpost.com/powerpost/what-to-do--and-what-not-to-do--as-a-trump-cabinet-nominee/2017/01/14/c38db458-d9d5-11e6-b8b2-cb5164beba6b_story.html'] = {
    name: 'washingtonpost',
    id: 'e6f775e1d7b62c9a3b1e17016881069c',
    color: '#1955a5',
    title: 'What to do — and what not to do — as a Trump Cabinet nominee',
    intro: '',
};

Object.keys(cases).forEach((url) => {
    const item = cases[url];
    const arg = { body: JSON.stringify({ url }) };
    test(`#${item.name}`, (t) => {
        fetchContents.fetch(arg, null, (err, result) => {
            if (err) {
                t.end(err);
                return;
            }
            t.equal(result.statusCode, 200, 'The status code is 200');
            const response = JSON.parse(result.body);
            ['id', 'color', 'title', 'intro'].forEach((key) => {
                t.ok(typeof response[key] === 'string', `They property "${key}" exists.`);
                t.equal(response[key].trim(), item[key],
                    `They content of the property "${key}" is correct.`);
            });
            t.ok(response.content.trim().length > 0, 'The content is not empty.');
            setImmediate(t.end.bind(t));
        });
    });
});
