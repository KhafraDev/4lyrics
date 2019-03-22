const lyrics = require('./index');
lyrics.musixmatch.getURL('more than a feeling')
    .then(r => lyrics.musixmatch.getLyrics(r))
    .then(() => console.log('musixmatch lyrics obtained'))
    .catch(console.error);

lyrics.azlyrics.getURL('queen you\'re my best friend')
    .then(r => lyrics.azlyrics.getLyrics(r))
    .then(() => console.log('azlyrics lyrics obtained'))
    .catch(console.error);

lyrics.lyricscom.getURL('limelight')
    .then(r => lyrics.lyricscom.getLyrics(r))
    .then(() => console.log('lyrics.com lyrics obtained'))
    .catch(console.error);

lyrics.lyricslive.getURL('don\'t stop')
    .then(r => lyrics.lyricslive.getLyrics(r))
    .then(() => console.log('lyricslive lyrics obtained'))
    .catch(console.error);
