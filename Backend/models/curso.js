'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Curso.hasMany(models.Estudiante,{
          foreignKey:"idCurso",
      });
      Curso.belongsTo(models.Profesor,{
          foreignKey:"idProfesor",
      })
    }
  };
  Curso.init({
    idProfesor: DataTypes.STRING,
    grado: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Curso',
    timestamps: false,
  });
  return Curso;
};