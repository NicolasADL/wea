'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mensaje extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mensaje.belongsTo(models.Profesor,{
          foreignKey:"idSender"
      })
      
    }
  };
  Mensaje.init({
    idSender: DataTypes.STRING,
    idReceiver: DataTypes.ARRAY(DataTypes.TEXT),
    asunto:DataTypes.STRING,
    contenido: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Mensaje',
    timestamps: false,
  });
  return Mensaje;
};