import fs from 'fs';
import path from 'path';
import pool from './database';

const initDb = async () => {
  try {
    const sqlPath = path.join(__dirname, 'init_db.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('Initializing database schema...');
    await pool.query(sql);
    console.log('Database schema initialized successfully!');
  } catch (error) {
    console.error('Error initializing database schema:', error);
    process.exit(1);
  } finally {
    // We don't necessarily want to close the pool if this is called from within the app,
    // but if it's a standalone script, we should.
  }
};

if (require.main === module) {
  initDb().then(() => process.exit(0));
}

export default initDb;
