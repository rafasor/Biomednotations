import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouters from './routers/UserRouter';
import AnalysisRouter from './routers/AnalysisRouter';
import PatientRouter from './routers/PatientRouter';

dotenv.config(); // Carrega as variáveis de ambiente a partir de um arquivo .env

export const app = express();
const PORT = process.env.PORT || 3030;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';

// Middleware para processar o corpo das requisições como JSON
app.use(express.json());

// Configuração das rotas
app.use('/api', UserRouters);
app.use('/api', PatientRouter)
app.use('/api', AnalysisRouter)

// Middleware para tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Conexão com o MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');

    // Iniciar o servidor após a conexão com o MongoDB ser estabelecida
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });