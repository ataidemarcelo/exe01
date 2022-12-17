const express = require('express');
require('express-async-errors');
require('dotenv').config();
const cors = require('cors');

const routers = require('./routes/routers');
const { errorMiddleware } = require('./middlewares');

const app = express();

app.use(express.json());
app.use(cors());
app.use(routers);

app.get('/ping', (_req, res) => res.status(200).json({ message: 'Pong!' }));

app.use('/*', (req, res) => {
  res.status(404).json({ message: `Not found: ${req.baseUrl}` });
});

app.use(errorMiddleware);

module.exports = app;