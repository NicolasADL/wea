'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Archivo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Archivo.belongsTo(models.Asignatura,{
          foreignKey:"idAsignatura"
      })
    }
  };
  Archivo.init({
    idAsignatura: DataTypes.INTEGER,
    tipo: DataTypes.STRING,
    archivo: DataTypes.STRING,
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Archivo',
    timestamps:false
  });
  return Archivo;
};