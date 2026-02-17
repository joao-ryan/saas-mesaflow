import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

let poolConfig: any = {
  connectionString,
  ssl: connectionString?.includes('neon.tech') ? { rejectUnauthorized: false } : (process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false),
};

// Se a string de conexão falhar na resolução automática do pg, tentamos decompor
if (connectionString && connectionString.includes('neon.tech')) {
  try {
    const url = new URL(connectionString);
    poolConfig = {
      ...poolConfig,
      user: url.username,
      password: url.password ? decodeURIComponent(url.password) : undefined,
      host: url.hostname,
      port: parseInt(url.port || '5432'),
      database: url.pathname.slice(1),
    };
  } catch (e) {
    // Fallback para a string bruta se o URL for inválido
  }
}

const pool = new Pool(poolConfig);

pool.on('error', (err) => {
  console.error('Erro inesperado no cliente PostgreSQL:', err);
  process.exit(-1);
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
export const getClient = () => pool.connect();

export default pool;
