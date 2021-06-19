'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profesor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profesor.belongsTo(models.Asignatura,{
          foreignKey:"idAsignatura",

      });
    }
  };
  Profesor.init({
    rut: DataTypes.STRING,
    nombre: DataTypes.STRING,
    contraseña: DataTypes.STRING,
    idAsignatura: DataTypes.INTEGER,
    jefe: DataTypes.BOOLEAN,
    idCurso: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profesor',
    timestamps: false,
  });
  return Profesor;
};