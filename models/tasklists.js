'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tasklists extends Model {
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
  tasklists.init({
    idusers: DataTypes.INTEGER,
    taskname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tasklists',
  });
  return tasklists;
};