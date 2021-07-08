'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apoderado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Apoderado.belongsTo(models.Estudiante,{
          foreignKey:"idEstudiante",
      })
    }
  };
  Apoderado.init({
    rut: {
        primaryKey:true,
        type:DataTypes.STRING
    },
    nombre: DataTypes.STRING,
    password: DataTypes.STRING,
    idEstudiante: DataTypes.STRING,
    registrado: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Apoderado',
    timestamps: false,
  });
  return Apoderado;
};