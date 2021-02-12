'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    static associate(models) {
      // define association here
      models.Users.belongsTo(models.Users, {
        foreignKey: "idUsers",
      });
    }
  }

  Tasks.init({
    idusers: DataTypes.INTEGER,
    idtasklists: DataTypes.INTEGER,
    tasktitle: DataTypes.STRING,
    taskdescription: DataTypes.STRING,
    taskscheduling: DataTypes.STRING,
    taskassign: DataTypes.STRING,
    taskdate: DataTypes.STRING,
    taskattachement: DataTypes.STRING,
    tasktag: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tasks',
  });
  return Tasks;
};