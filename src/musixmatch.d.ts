export default class MusixMatch {
    /**
     * @returns {string} Random user agent
     */
    get useragent(): string;
    /**
     * Fetches a list of song lyric URLs based on the query.
     * @param {string} q
     */
    fetchURLs(q: string): Promise<Array<string>>;
    /**
     * Parse the page's HTML and return the lyric URLs.
     * @param {string} t
     * @returns {Array} Array of lyric URLs 
     */ 
    parseURLs(t: string): Array<string>;
    /**
     * Fetch lyrics from specified URL
     * @param {string} url 
     */
    fetchLyrics(url: string): Promise<string[]>;
    /**
     * Parse the page's HTML and return the lyrics.
     * @param {string} t 
     * @returns {Array<string>} Array of lyric blocks
     */
    parseLyrics(t: string): Array<string>;
}
