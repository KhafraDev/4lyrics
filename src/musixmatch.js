const { join } = require('path');
const { readFileSync } = require('fs');
const UserAgents = readFileSync(join(__dirname, '..', 'user-agents.txt')).toString();

const fetch = require('node-fetch');
const xpath = require('xpath');
const { DOMParser } = require('xmldom');

const SEARCH_URL = 'https://www.musixmatch.com/search/';

class MusixMatch {
    async fetchURL(q) {
        const UA = UserAgents[Math.floor(Math.random() * UserAgents.length)];

        try {
            const res = await fetch(SEARCH_URL + encodeURIComponent(q), {
                headers: { // headers found after making a search
                    'Host': 'www.musixmatch.com',
                    'User-Agent': UA,
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Referer': 'https://www.musixmatch.com/search/',
                    'DNT': 1,
                    'Connection': 'keep-alive',
                    'Cookie': 'mxm_bab=BB',
                    'Upgrade-Insecure-Requests': 1,
                    'Cache-Control': 'max-age=0',
                    'TE': 'Trailers'
                }
            });

            if(res.status !== 200) throw new Error(`Received status ${res.status} (${res.statusText})`);

            return this.parseURLs(await res.text());
        } catch(err) {
            throw err;
        }
    }

    parseURLs(t) {
        const doc = new DOMParser().parseFromString(t);
        const nodes = xpath.select('//a[@class="title"]', doc);        
        const list = [];

        // go through each node and each attribute
        for(let j = 0; j < nodes.length; j++) {
            for(let i = 0; i < nodes[j].attributes.length; i++) {
                if(nodes[j].attributes[i.toString()].nodeName === 'href') { // keys are stored as strings
                    list.push('https://musixmatch.com' + nodes[j].attributes[i.toString()].value);
                    break;
                }
            }
        }

        return list;
    }

    async fetchLyrics(url) {
        if(!/https?:\/\/musixmatch.com\/lyrics\//.test(url)) throw new Error('Invalud url ' + url);

        const res = await fetch(url, {
            headers: {

            }
        });

        if(res.status !== 200) throw new Error(`Received status ${res.status} (${res.statusText})`);
    }
}

module.exports = {
    MusixMatch
}