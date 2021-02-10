'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tasklists extends Model {

    static associate(models) {
      // define association here
      models.Users.belongsTo(models.Users, {
        foreignKey: "idUsers",
      });
    }
  };

  Tasklists.init({
    idusers: DataTypes.INTEGER,
    taskname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tasklists',
  });
  return Tasklists;
};