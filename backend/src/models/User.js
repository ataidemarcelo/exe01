module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    image: DataTypes.STRING,
    role: { type: DataTypes.STRING, defaultValue: 'user' },
  }, {
    underscored: true,
    timestamps: true,
    tableName: 'users'
  });

  return User;
};
