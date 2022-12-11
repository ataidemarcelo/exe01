const Joi = require('joi');

const userFieldsSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
  image: Joi.string(),
}).messages({
  'any.only': 'password and password confirmation are not the same'
});

module.exports = {
  userFieldsSchema,
};
