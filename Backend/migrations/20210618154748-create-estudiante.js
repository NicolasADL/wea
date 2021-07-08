'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Estudiantes', {
      rut: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      registrado: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      idCurso: {
        defaultValue: 1,
        type: Sequelize.INTEGER,
        references:{
            model:'Cursos',
            key:'id'
        },
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Estudiantes');
  }
};