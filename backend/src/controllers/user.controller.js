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
  const { displayName, email, password } = value;
  // Criptografar senha!!!

  const newUser = await userService.addUser({ displayName, email, passwordHash: password });

  delete newUser.dataValues.passwordHash;
  return res.status(200).json(newUser);
};

module.exports = {
  createNewUser,
};
