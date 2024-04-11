const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL|| 'postgres://postgres:postgres@database:5432/autk6',
    ssl: process.env.DATABASE_URL ? true : false
});

module.exports = { pool }