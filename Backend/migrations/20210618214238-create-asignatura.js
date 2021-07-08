'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Asignaturas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idCurso: {
        defaultValue: 1,
        type: Sequelize.INTEGER,
        references:{
            model:'Cursos',
            key:'id'
        }
      },
      idProfesor: {
        defaultValue: 1,
        type: Sequelize.STRING,
        references:{
            model:'Profesors',
            key:'rut'
        }
      },
      nombre: {
        type: Sequelize.STRING
      },
      semestre: {
        type: Sequelize.INTEGER
      },
     
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Asignaturas');
  }
};