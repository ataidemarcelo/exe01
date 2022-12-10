const express = require('express');
require('dotenv').config();
const routers = require('./routes/routers');

const app = express();

app.use(express.json());
app.use(routers);

app.get('/ping', (_req, res) => res.status(200).json({ message: 'Pong!' }));

module.exports = app;