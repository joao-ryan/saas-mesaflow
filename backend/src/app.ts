import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { z } from 'zod';
import routes from './routes';

dotenv.config();

const app = express();

// Middlewares de segurança e utilitários
app.use(helmet());
app.use(cors());
app.use(express.json());

// Definição das Rotas principais
app.use('/api/v1', routes);

// Rota de verificação de integridade (Health Check)
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Gerenciador Global de Erros
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  if (err instanceof z.ZodError) {
    return res.status(400).json({
      status: 'error',
      message: 'Falha na validação',
      errors: err.issues,
    });
  }

  res.status(500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' ? 'Erro Interno do Servidor' : err.message,
  });
});

export default app;
