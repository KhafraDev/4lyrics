const { join } = require('path');
const { readFileSync } = require('fs');
const UserAgents = readFileSync(join(__dirname, '..', 'user-agents.txt')).toString().split('\n');

const fetch = require('node-fetch');
const { select } = require('xpath');
const { DOMParser } = require('xmldom');

const SEARCH_URL = 'http://www.songlyrics.com/index.php?section=search&submit=Search&searchW=';

class SongLyricsCom {
    /**
     * @returns {string} Random user agent
     */
    get useragent() {
        const h = UserAgents[Math.floor(Math.random() * UserAgents.length)];
        return Buffer.from(h, 'ascii').toString();
    }

    /**
     * Fetches a list of song lyric URLs based on the query.
     * @param {string} query
     * @returns {Promise<string[]>} URL list
     */
    async fetchURLs(q) {
        try {
            const res = await fetch(SEARCH_URL + encodeURIComponent(q.replace(/\s+/g, '+')), {
                headers: {
                    'Host': 'www.songlyrics.com',
                    'User-Agent': this.useragent,
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Upgrade-Insecure-Requests': 1
                }
            });

            if(res.status !== 200) throw new Error(`Received status ${res.status} (${res.statusText})`);

            return this.parseURLs(await res.text());
        } catch(err) {
            throw err;
        }
    }

    /**
     * Parses the HTML fetched previously, returning an array of URLs.
     * @param {string} html
     * @returns {string[]} Array of URLs
     */
    parseURLs(t) {
        const doc = new DOMParser({ errorHandler: {warning:()=>{}, error:()=>{}} }).parseFromString(t);
        const nodes = select('//*[@title]', doc);        
        const list = [];

        for(let j = 0; j < nodes.length; j++) {
            if(nodes[j].tagName !== 'a') continue;

            for(let i = 0; i < nodes[j].attributes.length; i++) {
                if(
                    nodes[j].attributes[i.toString()].nodeName === 'href' &&
                    nodes[j].attributes[i.toString()].value.match(/http:\/\/(www.)?songlyrics.com\//)
                ) { // hack but xpath did not want to work correctly
                    list.push(nodes[j].attributes[i.toString()].value);
                }
            }
        }

        return [...new Set(list)]; // remove duplicates.
    }

    /**
     * Fetch lyrics from specified URL
     * @param {string} url 
     * @returns {Promise<string[]>}
     */
    async fetchLyrics(url) {
        if(typeof url !== 'string') throw new Error('URL must be of type string');
        if(!/https?:\/\/(www.)?songlyrics.com\//.test(url)) throw new Error('Invalid URL ' + url);

        const res = await fetch(url, {
            headers: {
                'Host': 'www.songlyrics.com',
                'User-Agent': this.useragent,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Upgrade-Insecure-Requests': 1,
                'Cache-Control': 'max-age=0',
            }
        });

        if(res.status !== 200) throw new Error(`Received status ${res.status} (${res.statusText})`);

        return this.parseLyrics(await res.text());
    }

    /**
     * Parse the page's HTML and return the lyrics.
     * @param {string} html 
     * @returns {string[]} Array of lyric blocks
     */
    parseLyrics(t) {
        const doc = new DOMParser({ errorHandler: {warning:()=>{}, error:()=>{}} }).parseFromString(t);
        const nodes = select('//*[@class="songLyricsV14 iComment-text"]', doc);        
        const lyrics = [];

        for(let j = 0; j < nodes.length; j++) {
            for(let i = 0; i < nodes[j].childNodes.length; i++) {
                const nodeValue = nodes[j].childNodes[i.toString()].nodeValue;
                if(Boolean(nodeValue)) {
                    lyrics.push(nodeValue);
                }
            }
        }

        return lyrics;
    }
}

module.exports = SongLyricsCom;