module.exports = {
    MusixMatch: require('./modules/musixmatch'),
    AzLyrics: require('./modules/azlyrics'),
    LyricsCom: require('./modules/lyrics.com'),
    SongLyricsCom: require('./modules/songlyrics.com'),

    /* Utility */
    validateHeaders: require('./util/verify_useragent')
}