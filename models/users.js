'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // define association here
      models.Users.hasMany(models.Tasks, {
        foreignKey: "idUsers",
      });
      models.Users.hasMany(models.Tasklists, {
        foreignKey: "idUsers",
      });
    }
  };

  Users.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};