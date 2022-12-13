const { User } = require('../models');

const checkUserExist = async (email) => {
  const exist = await User.findOne({ where: { email } });

  return exist;
};

const addUser = async (dataToAddUser) => {
  const newUser = await User.create(dataToAddUser);

  return newUser;
};

module.exports = {
  checkUserExist,
  addUser,
};
