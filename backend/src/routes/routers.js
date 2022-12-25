const express = require('express');

const userRouter = require('./user.router');
const authRouter = require('./auth.router');
const authMiddleware = require('../middlewares/auth.middleware');

const routers = express.Router();

routers.use('/users', userRouter);
routers.use('/login', authRouter);


routers.get('/dashboard', authMiddleware, (req, res) => res.status(200).json({ title: 'Dashboard!!!' }));

module.exports = routers;