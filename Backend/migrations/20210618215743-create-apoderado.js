'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Apoderados', {
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
      registrado: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      idEstudiante: {
        type: Sequelize.STRING,
        references:{
            model:"Estudiantes",
            key:"rut"
        }
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Apoderados');
  }
};