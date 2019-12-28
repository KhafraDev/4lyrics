# 4Lyrics
A webscraper to parse and return lyrics from different sites.
No API keys required!

## Benefits (over main branch)
* Only 3 dependencies.
* Uses ``xpath`` and ``xmldom`` instead of Cheerio and its dependencies.
* Has (hopefully) functional typings for TypeScript users (v2.0.2).
* Much cleaner and lighter than master branch.
* Versatile; easily adaptable to other sites.
* Removed Lyricslive module entirely as the site is now defunct. ``songlyrics.com`` is added in place.

# Quick-start

```js
const { MusixMatch, AzLyrics, SongLyricsCom, LyricsCom } = require('./lib/musixmatch');
const M = new MusixMatch();
const A = new AzLyrics();
const S = new SongLyricsCom();
const L = new LyricsCom();

(async () => {
    // musixmatch
    const m_u = await M.fetchURLs('Boston more than a feeling');
    const m_l = await M.fetchLyrics(m_u[0]);
    // azlyrics
    const a_u = await A.fetchURLs('Boston more than a feeling');
    const a_l = await A.fetchLyrics(a_u[0]);
    // songlyrics.com
    const s_u = await S.fetchURLs('Boston more than a feeling');
    const s_l = await S.fetchLyrics(s_u[0]);
    // lyrics.com
    const l_u = await L.fetchURLs('Boston more than a feeling');
    const l_l = await L.fetchLyrics(l_u[0]);
})();
```

## Note
* If no lyrics or URLs are found, an empty array is returned.
* Musixmatch is recommended for search accuracy and lyric accuracy.

# WIP
1. Options (URL limits, etc.).

