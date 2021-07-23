'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Mensajes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idSender: {
        type: Sequelize.STRING,
        references:{
            model:"Profesors",
            key:"rut"

        }
      },
      idReceiver: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      asunto: {
        type: Sequelize.STRING
      },
      contenido: {
        type: Sequelize.TEXT
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Mensajes');
  }
};