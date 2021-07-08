'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('HorarioAsignaturas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idAsignatura: {
        type: Sequelize.INTEGER,
        references:{
            model:"Asignaturas",
            key:"id"
        }
      },
      bloque: {
        type: Sequelize.INTEGER
      },
      dia: {
        type: Sequelize.STRING
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('HorarioAsignaturas');
  }
};