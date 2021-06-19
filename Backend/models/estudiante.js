'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estudiante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Estudiante.belongsTo(models.Curso,{
          foreignKey: "idCurso",
      });
      Estudiante.hasOne(models.Apoderado,{
          foreignKey: "idEstudiante",
      });
    }
  };
  Estudiante.init({
    rut: DataTypes.STRING,
    password: DataTypes.STRING,
    nombre: DataTypes.STRING,
    registrado: DataTypes.BOOLEAN,
    idCurso: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Estudiante',
    timestamps: false,
  });
  return Estudiante;
};