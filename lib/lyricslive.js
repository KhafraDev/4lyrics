const fetch = require('node-fetch');
const cheerio = require('cheerio');

const getURL = query => {
    return new Promise((resolve, reject) => {
        fetch(`https://lyricsalive.com/search/${encodeURI(query)}`)
        .then(r => r.text())
        .then(body => {
            const $ = cheerio.load(body);
            const bestMatchURL = $('li[class="showArtist showCoverart"] a').attr('href') 
                    ? $('li[class="showArtist showCoverart"] a').attr('href').valueOf() 
                    : reject(new Error('No song found!')); // undefined (if it's an error)
            return bestMatchURL ? resolve(`https://lyricsalive.com${bestMatchURL}`) : bestMatchURL;
        });
    });
}

const getLyrics = url => {
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(r => r.text())
        .then(body => {
            const $ = cheerio.load(body);
            // they use <br> for new lines 🙄
            const lyrics = $('p[class="lyric-text"]') 
                    ? $('p[class="lyric-text"]').html().replace(/<br>/g, '\n').replace(/\s+/g, '') 
                    : reject(new Error('No lyrics found!'));
            const formatted = lyrics ? $(`<p>${lyrics}</p>`).text() : lyrics; 
            // convert lyrics back into an html object so cheerio can remove all the nasty html attributes
            return (formatted && lyrics) ? resolve(formatted) : formatted;
        });
    });
}

module.exports = {
    getURL,
    getLyrics
}