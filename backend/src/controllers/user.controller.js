const bcrypt = require('bcryptjs');

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
  
  const hashedPassword = await bcrypt.hash(password, 8);

  const newUser = await userService.addUser({ displayName, email, passwordHash: hashedPassword });

  delete newUser.dataValues.passwordHash;
  return res.status(200).json(newUser);
};

module.exports = {
  createNewUser,
};
