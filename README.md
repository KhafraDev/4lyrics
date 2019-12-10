# 4Lyrics
Get lyrics from MusixMatch.com!

## Benefits (over main branch)
* Only 3 dependencies.
* Uses ``xpath`` and ``xmldom`` instead of Cheerio and its dependencies.

# Example
* The first URL shown is the best result.
```js
const { MusixMatch } = require('./lib/musixmatch');
const m = new MusixMatch();

(async () => {
    const u = await m.fetchURL('Boston more than a feeling');
    const l = await m.fetchLyrics(u[0]);
})();
```


