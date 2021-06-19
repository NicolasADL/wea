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