const { userFieldsSchema } = require('./validations/schema.user');
const { userService } = require('../services');

const createNewUser = async (req, res, next) => {
  const { error, value } = userFieldsSchema.validate(req.body);

  if (error) {
    error.statusCode = 400;
    return next(error);
  }

  const userExist = await userService.checkUserExist(value.email);

  if (userExist) {
    const newError = new Error('User already registered');
    newError.statusCode = 409;
    
    return next(newError);
  }
  // Adicionar novo usuário no DB -> addUser 201

  return res.status(200).json({ value });
};

module.exports = {
  createNewUser,
};
