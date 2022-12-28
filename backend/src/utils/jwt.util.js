require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'deveriaExistirUma_SECRET_KEY';

const jwtConfig = {
  expiresIn: 10,
  algorithm: 'HS256',
};

const createToken = (payload) => {
  const token = jwt.sign({ payload }, secret, jwtConfig);

  return token;
};

const validateToken = (token) => {
  const { payload } = jwt.verify(token, secret);

  return payload;
};

module.exports = {
  createToken,
  validateToken,
};
