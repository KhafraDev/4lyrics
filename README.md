# 4Lyrics
A webscraper to parse and return lyrics from different sites.

## Benefits (over main branch)
* Only 3 dependencies.
* Uses ``xpath`` and ``xmldom`` instead of Cheerio and its dependencies.
* Has (hopefully) functional typings for TypeScript users (v2.0.2).
* Much cleaner and lighter than master branch.
* Versatile; easily adaptable to other sites.

# Example
* The first URL shown is the best result.
```js
const { MusixMatch } = require('./lib/musixmatch');
const m = new MusixMatch();

(async () => {
    const u = await m.fetchURLs('Boston more than a feeling');
    const l = await m.fetchLyrics(u[0]);
})();
```
If no lyrics or URLs are found, an empty array is returned instead of erroring. 

# WIP
1. Options (URL limits, etc.).

