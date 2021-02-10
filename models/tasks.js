'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.tasks.belongsTo(models.users, {
        foreignKey: "idusers",
      });
    }
  };
  tasks.init({
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
    modelName: 'tasks',
  });
  return tasks;
};