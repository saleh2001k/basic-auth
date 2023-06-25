// const { DataTypes } = require('sequelize');
// const sequelize = require('./')

// const User = sequelize.define('User', {
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// User.beforeCreate(async (user) => {
//   const hashedPassword = await bcrypt.hash(user.password, 10);
//   user.password = hashedPassword;
// });

// User.prototype.authenticateBasic = async function (username, password) {
//   const user = await User.findOne({ where: { username } });
//   if (user && await bcrypt.compare(password, user.password)) {
//     return user;
//   }
//   throw new Error('Invalid Login');
// };

// module.exports = User;


'use strict';

const bcrypt = require('bcrypt');

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.beforeCreate((user) => {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  });

  User.beforeFind((options) => {
    if (options.where && options.where.password) {
      options.where.password = bcrypt.hashSync(options.where.password, 10);
    }
  });

  return User;
};

module.exports = user;
