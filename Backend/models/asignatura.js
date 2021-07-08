'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Asignatura extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Asignatura.belongsTo(models.Curso,{
          foreignKey:"idCurso",
      });
      Asignatura.belongsTo(models.Profesor,{
          foreignKey:"idProfesor"
      });
      Asignatura.hasMany(models.HorarioAsignatura,{
          foreignKey:"idAsignatura"
      })
    }
  };
  Asignatura.init({
    idCurso: DataTypes.INTEGER,
    idProfesor: DataTypes.STRING,
    nombre: DataTypes.STRING,
    semestre: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Asignatura',
    timestamps: false,
  });
  return Asignatura;
};