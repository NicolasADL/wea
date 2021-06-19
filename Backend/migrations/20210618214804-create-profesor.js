'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Profesors', {
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
      idAsignatura: {
        type: Sequelize.INTEGER,
        references:{
            model:"Asignaturas",
            key:"id"
        }
      },
      jefe: {
        type: Sequelize.BOOLEAN
      },
      registrado: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      idCurso: {
        type: Sequelize.INTEGER,
        references:{
            model:"Cursos",
            key:"id"
        }
      },
      
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Profesors');
  }
};