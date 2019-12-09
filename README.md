# 4Lyrics
Get lyrics from MusixMatch.com!

## Benefits (over main branch)
* Only 3 dependencies.
* Uses ``xpatch`` and ``xmldom`` instead.
* getURL**s** now returns a list of URLs.

# Example
* The first URL shown is the best result.
```js
const { MusixMatch } = require('./lib/musixmatch');
const m = new MusixMatch();

(async () => {
    await m.fetchURL('Boston more than a feeling');
    /*
        [ 'https://musixmatch.com/lyrics/Boston/More-Than-Feeling',
        'https://musixmatch.com/lyrics/Boston/More-Than-Feeling',
        'https://musixmatch.com/lyrics/Boston/More-Then-a-Feeling',
        'https://musixmatch.com/lyrics/Igor-Presnyakov/More-Than-a-Feeling-Boston',
        'https://musixmatch.com/lyrics/Boston/More-Than-a-Feelin',
        'https://musixmatch.com/lyrics/Eminem/Nail-in-the-Coffin',
        'https://musixmatch.com/lyrics/Eminem/Eminem-I-m-a-Big-Deal',
        'https://musixmatch.com/lyrics/Childish-Gambino/All-Yall',
        'https://musixmatch.com/lyrics/Boston/Feeling-Satisfied',
        'https://musixmatch.com/lyrics/The-Devil-Wears-Prada/Worldwide',
        'https://musixmatch.com/lyrics/Rich-Homie-Quan/Sorry' ]
    */
})();
```


