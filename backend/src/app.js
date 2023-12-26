const express = require('express');
require('express-async-errors');
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const routers = require('./routes/routers');
const { errorMiddleware } = require('./middlewares');

const app = express();

const limit = {
  timeRequests: 3 * 60 * 1000,
  maxRequests: 3
};


app.use(express.json());
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

module.exports = app;