const { userFieldsSchema } = require('./validations/schema.user');

const createNewUser = (req, res) => {
  const { error, value } = userFieldsSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }

  // Services (regras de negócio)
    // Validar se usuário já existe -> checkUserExist 409
    // Adicionar novo usuário no DB -> addUser 201

  return res.status(200).json({ value });
};

module.exports = {
  createNewUser,
};
