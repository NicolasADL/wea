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
      Profesor.hasMany(models.Asignatura,{
          foreignKey:"idProfesor"
      })
      Profesor.hasMany(models.Mensaje,{
        foreignKey:"idSender"
    })
      Profesor.hasOne(models.Curso,{
          foreignKey:"idProfesor"
      })
    }
  };
  Profesor.init({
    rut: {
        primaryKey:true,
        type:DataTypes.STRING
    },
    nombre: DataTypes.STRING,
    password: DataTypes.STRING,
    jefe: DataTypes.BOOLEAN,
    registrado: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Profesor',
    timestamps: false,
  });
  return Profesor;
};