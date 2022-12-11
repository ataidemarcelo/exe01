const { User } = require('../models');

const checkUserExist = async (email) => {
  const exist = await User.findOne({ where: { email } });

  return exist;
};

const addUser = () => {};

module.exports = {
  checkUserExist,
  addUser,
};
