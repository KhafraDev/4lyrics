const fetch = require('node-fetch');
const cheerio = require('cheerio');

const getURL = query => {
    return new Promise((resolve, reject) => {
        fetch(`https://www.lyrics.com/serp.php?st=${encodeURI(query.replace(/\s+/g, '+'))}&stype=1`)
            .then(r => r.text())
            .then(body => {
                const $ = cheerio.load(body);
                const bestMatchURL = $('div[class="sec-lyric sec-center clearfix row"]').first().find('a').attr('href') ? $('div[class="sec-lyric sec-center clearfix row"]').first().find('a').attr('href').valueOf() : null;
                return bestMatchURL ? resolve(bestMatchURL) : reject(new Error('No songs found!'));
            });
    });
}

const getLyrics = url => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(r => r.text())
            .then(body => {
                const $ = cheerio.load(body);
                const lyrics = $('pre[id="lyric-body-text"]') ? $('pre[id="lyric-body-text"]').text() : null;
                return lyrics ? resolve(lyrics) : reject(new Error('No lyrics found!'));
            });
    });
}

module.exports = {
    getURL,
    getLyrics
}