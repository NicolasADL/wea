'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Profesors', {
      rut: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      jefe: {
        type: Sequelize.BOOLEAN
      },
      registrado: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      
      
      
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Profesors');
  }
};