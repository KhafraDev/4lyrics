const { MusixMatch } = require('./lib/musixmatch');

const m = new MusixMatch();

(async () => {
    const r = await m.fetchURL('Boston more than a feeling');
    console.log(r);
})();