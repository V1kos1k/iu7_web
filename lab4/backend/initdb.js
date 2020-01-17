const fs = require('fs');
const db = require('./db');

class InitDB {
    constructor() {}
    async processSQLFile(fileName) {
        var queries = fs
            .readFileSync(fileName)
            .toString()
            .replace(/(\r\n|\n|\r)/gm, ' ')
            .replace(/\s+/g, ' ')
            .split(';')
            .map(Function.prototype.call, String.prototype.trim)
            .filter(function(el) {
                return el.length != 0;
            });

        for (let i = 0; i < queries.length; ++i) {
            try {
                await db.query(queries[i]);
            } catch (err) {
                return false;
            }
        }

        return true;
    }
}

module.exports = InitDB;
