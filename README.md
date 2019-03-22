# 4Lyrics
Get lyrics from 4 different sites!
With user input :)
* Musixmatch
* azlyrics
* lyrics.com
* lyricslive

***

# Basic Use
* Examples used from test file
```js
const lyrics = require('4lyrics');
```

# Musixmatch
```js
lyrics.musixmatch.getURL('more than a feeling')
    .then(r => lyrics.musixmatch.getLyrics(r))
    .then(() => console.log('musixmatch lyrics obtained'))
    .catch(console.error);
```

# Azlyrics
```js
lyrics.azlyrics.getURL('queen you\'re my best friend')
    .then(r => lyrics.azlyrics.getLyrics(r))
    .then(() => console.log('azlyrics lyrics obtained'))
    .catch(console.error);
```

# Lyrics.com
```js
lyrics.lyricscom.getURL('limelight')
    .then(r => lyrics.lyricscom.getLyrics(r))
    .then(() => console.log('lyrics.com lyrics obtained'))
    .catch(console.error);
```

# Lyricslive
```js
lyrics.lyricslive.getURL('don\'t stop')
    .then(r => lyrics.lyricslive.getLyrics(r))
    .then(() => console.log('lyricslive lyrics obtained'))
    .catch(console.error);
```


