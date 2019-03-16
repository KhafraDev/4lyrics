const fetch = require('node-fetch');
const cheerio = require('cheerio');

const getURL = query => {
    return new Promise((resolve, reject) => {
        fetch(`https://lyricsalive.com/search/${encodeURI(query)}`)
            .then(r => r.text())
            .then(body => {
                const $ = cheerio.load(body);
                $('script').remove();
                const bestMatchURL = $('li[class="showArtist showCoverart"]').find('a').first().attr('href') ? $('li[class="showArtist showCoverart"]').find('a').first().attr('href').valueOf() : null;
                return bestMatchURL ? resolve(bestMatchURL) : reject(new Error('No song found!'));
            });
    });
}

const getLyrics = url => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(r => r.text())
            .then(body => {
                const $ = cheerio.load(body);
                const lyrics = $('p[class="lyric-text"]') ? $('p[class="lyric-text"]').html().replace(/<br>/g, '\n').replace(/\s+/, '') : null;
                const formatted = lyrics ? $(`<p>${lyrics}</p>`).text() : lyrics; 
                // convert lyrics back into an html object so cheerio can remove all the nasty html attributes
                return (formatted && lyrics) ? resolve(formatted) : reject(new Error('No lyrics found!'));
            });
    });
}

module.exports = {
    getURL,
    getLyrics
}