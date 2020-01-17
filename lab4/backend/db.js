const { Pool, Client } = require('pg');
const config = require('./config');
const pool = new Pool({
    host: config.databaseHost,
    port: config.databasePort,
    database: config.databaseName,
    user: config.databaseUser,
    password: config.databasePassword
});

module.exports = pool;
