'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Apoderados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rut: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      registrado: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      idEstudiante: {
        type: Sequelize.INTEGER,
        references:{
            model:"Estudiantes",
            key:"id"
        }
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Apoderados');
  }
};