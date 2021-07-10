'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Archivos', {
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
      tipo: {
        type: Sequelize.STRING
      },
      archivo: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Archivos');
  }
};