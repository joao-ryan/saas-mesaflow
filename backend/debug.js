require('dotenv').config();
const urlStr = process.env.DATABASE_URL || '';
console.log('--- DB URL DEBUG (URL CLASS) ---');
try {
  const url = new URL(urlStr);
  console.log('Host:', url.hostname);
  console.log('User:', url.username);
  console.log('DB:', url.pathname.slice(1));
} catch (e) {
  console.error('Invalid URL:', e.message);
}
console.log('-------------------');
