const { authService } = require('../services');

const login = async (req, res) => {
  // pegar os dados da requisição
  const { email, password } = req.body;

  // validar os dados recebidos

  // checar se email exite
  // checar se senha enviada confere com a do DB
  // criar um token JWT
  const token = await authService.authenticateUser({ email, password });
  
  // enviar o token como resposta
  res.status(200).json(token);
}

module.exports = {
  login,
};
