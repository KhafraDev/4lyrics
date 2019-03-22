const fetch = require('node-fetch');
const cheerio = require('cheerio');

const getURL = query => {
    return new Promise((resolve, reject) => {
        fetch(`https://www.lyrics.com/serp.php?st=${encodeURI(query)}&stype=1`)
        .then(r => r.text())
        .then(body => {
            const $ = cheerio.load(body);
            const bestMatchURL = $('div[class="sec-lyric sec-center clearfix row"] div a').attr('href') 
                    ? $('div[class="sec-lyric sec-center clearfix row"] div a').attr('href').valueOf() 
                    : reject(new Error('No song found!'));
            return bestMatchURL ? resolve(`https://www.lyrics.com${bestMatchURL}`) : bestMatchURL;
        });
    });
}

const getLyrics = url => {
    return new Promise(resolve => {
        fetch(url)
        .then(r => r.text())
        .then(body => {
            const $ = cheerio.load(body);
            const lyrics = $('pre[id="lyric-body-text"]').text();
            
            // if the link is valid, it won't fail
            // from my testing (it probably will somehow)
            return resolve(lyrics);
        });
    });
}

module.exports = {
    getURL,
    getLyrics
}