const express = require('express');

const userRouter = require('./user.router');
const authRouter = require('./auth.router');

const routers = express.Router();

routers.use('/users', userRouter);
routers.use('/login', authRouter);

module.exports = routers;