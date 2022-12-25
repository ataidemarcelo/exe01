const { validateToken } = require('../utils/jwt.util');

module.exports = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    const err = new Error('Token not found');
    err.statusCode = 401;

    return next(err);
  }
  
  const payload = validateToken(token);

  req.user = payload;

  return next();
};