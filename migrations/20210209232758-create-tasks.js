'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idusers: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          model: 'Users',
          key: 'id'
        }
      },
      idtasklists: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          model: 'tasklists',
          key: 'id'
        }
      },
      tasktitle: {
        allowNull: false,
        type: Sequelize.STRING
      },
      taskdescription: {
        allowNull: false,
        type: Sequelize.STRING
      },
      taskscheduling: {
        allowNull: false,
        type: Sequelize.STRING
      },
      taskassign: {
        allowNull: false,
        type: Sequelize.STRING
      },
      taskdate: {
        allowNull: false,
        type: Sequelize.STRING
      },
      taskattachement: {
        allowNull: true,
        type: Sequelize.STRING
      },
      tasktag: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tasks');
  }
};