import app from './app';
import dotenv from 'dotenv';
import initDb from './config/init_db';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Inicializa o esquema do banco de dados na inicialização
    await initDb();

    const server = app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });

    // Encerramento Gracioso do Servidor
    const shutdown = () => {
      console.log('Servidor fechando...');
      server.close(() => {
        console.log('Servidor fechado.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    console.error('Falha ao iniciar o servidor:', error);
    process.exit(1);
  }
};

startServer();
