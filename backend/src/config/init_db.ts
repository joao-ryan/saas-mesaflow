import fs from 'fs';
import path from 'path';
import pool from './database';

const initDb = async () => {
  try {
    const sqlPath = path.join(__dirname, 'init_db.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('Inicializando o esquema do banco de dados...');
    await pool.query(sql);
    console.log('Esquema do banco de dados inicializado com sucesso!');
  } catch (error) {
    console.error('Erro ao inicializar o esquema do banco de dados:', error);
    process.exit(1);
  } finally {
    // Não fechamos o pool aqui se for chamado de dentro da aplicação,
    // mas se for um script standalone, o processo é encerrado no require.main.
  }
};

if (require.main === module) {
  initDb().then(() => process.exit(0));
}

export default initDb;
