const express = require('express');
require('express-async-errors');
require('dotenv').config();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const routers = require('./routes/routers');
const { errorMiddleware } = require('./middlewares');

const app = express();

const limit = {
  timeRequests: 5 * 60 * 1000,
  maxRequests: 10
};

app.use(helmet());
app.use(express.json({ limit: '1kb' }));
app.use(cors());

app.set('trust proxy', true);
app.use(rateLimit({
  windowMs: limit.timeRequests,
  max: limit.maxRequests,
  keyGenerator: function (req, _res) {
    return req.ip;
  }
}))

app.use(routers);

app.get('/ping', (_req, res) => res.status(200).json({ message: 'Pong!' }));

app.get('/status', (_req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');

  return res.status(200).json({ message: '[Healthy] - API Up!' })
});

app.use('/*', (req, res) => {
  res.status(404).json({ message: `Not found: ${req.baseUrl}` });
});

app.use(errorMiddleware);


// Garante que a aplicação não continue em um estado potencialmente inconsistente.
// Tratamento de Rejeições de Promessas não tratadas
process.on('unhandledRejection', (reason, _promise) => {
  console.error('Rejeição de Promessa não tratada:', reason);
  throw reason; // Re-lança a exceção para ser capturada por uncaughtException
});

// Tratamento global de exceções não capturadas
process.on('uncaughtException', err => {
  console.error('Erro não capturado:', err);
  process.exit(1); // Encerrar o processo após tratamento de erro
});

module.exports = app;