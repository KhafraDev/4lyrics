# Changelog

## v1.1.5
* Remove more divs in musixmatch that interfere.

# v1.1.6 
* Add a second way of detection and remove bad code.

# v1.1.61
* Fix a bug that caused lyrics to be removed accidentally.

# v2.0.0 (12/9/19)
* Remove Cheerio as a dependency (MusixMatch *only* for now).
* Remove support for other sites temporarily.
* Uses ``node-fetch``, ``xpath``, and ``xmldom``.
* getURL**s** now returns an array of URLs found.
* Replaces Promise chains with async/await.
* Handles errors (request not returning 200 status, other errors potentially thrown by ``node-fetch``).
* Uses real, proper headings instead of default ``node-fetch`` headings.
* Allows the user to input a list of user agents into [user-agents.txt](./user-agents.txt).
* Class-based now.

# v2.0.1 (12/9/19)
* Rename ``lib`` to ``src``.
* Removed useless files.
* Removed headers that didn't comply with the fetch [spec](https://fetch.spec.whatwg.org/#forbidden-header-name).
* Added in a function to fetch song lyrics given a valid musixmatch URL.
* Added a property in the MusixMatch class to get a random user-agent.
* Disable ``xmldom`` logging (errors and warnings).

# v2.0.2 (12/10/19)
* Add functional typings for TypeScript users.

# v2.0.3 (12/11/19)
* Add AzLyrics.com support.
* Add Lyrics.com support.
* Attempted to add Genius.com support but ``node-fetch`` was detected (503 error).

# v2.0.4 (12/11/19)
* Add Songlyrics.com support.
* Add in Utility function ``validateHeaders``.