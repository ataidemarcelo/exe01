const { authService } = require('../services');
const { loginFieldsSchema } = require('./validations/schema.login');

const login = async (req, res, next) => {
  // pegar os dados da requisição e validar
  const { error, value } = loginFieldsSchema.validate(req.body);

  if (error) {
    error.statusCode = 400;

    return next(error);
  }

  const { email, password } = value;

  const { token, payload: user } = await authService.authenticateUser({ email, password });
  
  // enviar o token como resposta
  res.status(200).json({ token, user });
}

module.exports = {
  login,
};
