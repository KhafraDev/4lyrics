const lyrics = require('./index');
lyrics.azlyrics.getURL('good morning good morning')
    .then(r => lyrics.azlyrics.getLyrics(r))
    .then(console.log)

