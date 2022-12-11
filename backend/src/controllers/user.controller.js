const { userFieldsSchema } = require('./validations/schema.user');

const createNewUser = (req, res, next) => {
  const { error, value } = userFieldsSchema.validate(req.body);

  if (error) {
    error.statusCode = 400;
    return next(error);
  }

  // Services (regras de negócio)
    // Validar se usuário já existe -> checkUserExist 409
    // Adicionar novo usuário no DB -> addUser 201

  return res.status(200).json({ value });
};

module.exports = {
  createNewUser,
};
