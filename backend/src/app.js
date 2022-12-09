const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => res.status(200).json({ message: 'Pong!' }));

module.exports = app;