const { join } = require('path');
const { readFileSync } = require('fs');
const UserAgents = readFileSync(join(__dirname, '..', 'user-agents.txt')).toString().split('\n');

const fetch = require('node-fetch');
const { select } = require('xpath');
const { DOMParser } = require('xmldom');

const SEARCH_URL = 'https://search.azlyrics.com/search.php?q=';

class AzLyrics {
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
     * @returns {string[]} URL list
     */
    async fetchURLs(q) {
        try {
            const res = await fetch(SEARCH_URL + encodeURIComponent(q.replace(/\s+/g, '+')), {
                headers: {
                    'Host': 'search.azlyrics.com',
                    'User-Agent': this.useragent,
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Referer': 'https://www.azlyrics.com/',
                    'Upgrade-Insecure-Requests': 1,
                    'Cache-Control': 'max-age=0'
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
        const nodes = select('//a[@target="_blank"][contains(@href, "https://www.azlyrics.com/lyrics/")]', doc);        
        const list = [];

        // go through each node and each attribute
        for(let j = 0; j < nodes.length; j++) {
            for(let i = 0; i < nodes[j].attributes.length; i++) {
                if(nodes[j].attributes[i.toString()].nodeName === 'href') { // keys are stored as strings
                    list.push(nodes[j].attributes[i.toString()].nodeValue);
                }
            }
        }

        return list;
    }

    /**
     * Fetch lyrics from specified URL
     * @param {string} url 
     */
    async fetchLyrics(url) {
        if(typeof url !== 'string') throw new Error('URL must be of type string');
        if(!/https?:\/\/(www.)?azlyrics.com\/lyrics\//.test(url)) throw new Error('Invalid URL ' + url);

        const res = await fetch(url, {
            headers: {
                'Host': 'www.azlyrics.com',
                'User-Agent': this.useragent,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Referer': url,
                'Upgrade-Insecure-Requests': 1,
                'Cache-Control': 'max-age=0'
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
        const nodes = select('//div[not(@class)]', doc);        
        const lyrics = [];

        for(let j = 0; j < nodes.length; j++) {
            if(typeof nodes[j].firstChild !== 'undefined' && typeof nodes[j].firstChild.data !== 'undefined') {
                const content = nodes[j].textContent.trim();
                if(/[a-zA-Z0-9]/.test(content)) { // check if any of the content is alphanumeric
                    lyrics.push(content);
                }
            }
        }

        return lyrics;
    }
}

module.exports = AzLyrics;