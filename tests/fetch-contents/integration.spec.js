
const test = require('tape');
const fetchContents = require('../../functions/fetch-contents/');

const cases = {};

cases['http://www.volksstimme.de/lokal/schoenebeck/kreis-gegen-ameos-erster-streit-nun-beigelegt'] = {
    name: 'generic',
    id: '5059f5295cb7cecfed0e7beb60b98742',
    color: '#3f51b5',
    title: 'Erster Streit nun beigelegt',
    intro: '',
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

cases['http://www.bbc.com/news/world-us-canada-38707722'] = {
    name: 'BBC.com/news',
    id: '8e4e09d7f5ec4c51cce21659570e8d65',
    color: '#BB1919',
    title: 'Trump claims media \'dishonest\' over crowd photos',
    intro: 'President Donald Trump has accused the media of dishonesty over the number of people attending his inauguration.',
};

cases['http://www.bbc.com/sport/tennis/38709479'] = {
    name: 'BBC.com/sport',
    id: 'e40c702f665c853d66a4c44df9e67834',
    color: '#BB1919',
    title: 'Australian Open 2017: Andy Murray suffers shock defeat by Mischa Zverev',
    intro: 'Andy Murray\'s hopes of winning a first Australian Open title ended with a shock defeat by world number 50 Mischa Zverev of Germany in the fourth round.',
};

cases['http://www.bbc.com/culture/story/20160908-the-language-rules-we-know-but-dont-know-we-know'] = {
    name: 'BBC.com/misc',
    id: 'ab29ee9cae8330980058c2042c9d199c',
    color: '#BB1919',
    title: 'The language rules we know – but don’t know we know',
    intro: 'Mark Forsyth tasted internet fame this week when a passage from a book he wrote went viral. He explains more language secrets that native speakers know without knowing.',
};

Object.keys(cases).forEach((url) => {
    const item = cases[url];
    test(`#${item.name}`, (t) => {
        fetchContents(url, (err, response) => {
            if (err) {
                t.end(err);
                return;
            }
            ['id', 'color', 'title', 'intro'].forEach((key) => {
                t.ok(typeof response[key] === 'string', `The property "${key}" exists.`);
                t.equal(response[key].trim(), item[key],
                    `The content of the property "${key}" is correct.`);
            });
            t.ok(response.content.trim().length > 0, 'The content is not empty.');
            setImmediate(t.end.bind(t));
        });
    });
});
