const bcrypt = require('bcryptjs');

const { User } = require('../models');
const { createToken } = require('../utils/jwt.util');

const authenticateUser = async (validData) => {
  const { email, password } = validData;

  // checar se email exite
  const [user] = await User.findAll({ where: { email } });

  if (!user) {
    const error = new Error('Invalid fields');
    error.statusCode = 400;
    
    throw error;
  }

  // checar se senha enviada confere com a do DB
  const isValidPassword = await bcrypt.compare(password, user.dataValues.passwordHash);

  if (!isValidPassword) {
    const error = new Error('Invalid fields');
    error.statusCode = 400;
    
    throw error;
  }
  
  // criar um token JWT
  const payload = { 
    userId: user.dataValues.id,
    name: user.dataValues.displayName,
    email: user.dataValues.email,
    role: user.dataValues.role,
    avatar: user.dataValues.image,
  };

  const token = createToken(payload);

  return token;
};

module.exports = {
  authenticateUser,
};
