const { join } = require('path');
const { readFileSync, writeFileSync } = require('fs');
const file = join(__dirname, '..', '..', 'user-agents.txt');
const UserAgents = readFileSync(file).toString().split('\n');

const invalidHeaderRegex = /[^\t\x20-\x7e\x80-\xff]/; // "borrowed" from node-fetch -> https://github.com/bitinn/node-fetch/blob/master/src/headers.js#L9

/**
 * Validate and fix headers without throwing an error.
 * @returns clean list of headers
 */
const validateHeaders = () => {
    console.log('Validating %d headers.', UserAgents.length);
    const n = UserAgents.map(m => m.replace(invalidHeaderRegex, '')).join('\n');
    writeFileSync(file, n);
    return true;
}

module.exports = validateHeaders;