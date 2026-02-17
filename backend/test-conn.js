const { Pool } = require('pg');
const parse = require('pg-connection-string').parse;
require('dotenv').config();

const url = process.env.DATABASE_URL;
console.log('Original URL:', url);

const config = parse(url);
console.log('Parsed Config:', {
  user: config.user,
  host: config.host,
  database: config.database,
  port: config.port,
  ssl: config.ssl
});

const pool = new Pool(config);

pool.connect((err, client, release) => {
  if (err) {
    console.error('Connection Error:', err.message);
    console.error('Full Error:', err);
    process.exit(1);
  }
  console.log('Connected successfully!');
  release();
  pool.end();
});
