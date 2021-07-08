'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HorarioAsignatura extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HorarioAsignatura.belongsTo(models.Asignatura,{
          foreignKey:"idAsignatura"
      })
    }
  };
  HorarioAsignatura.init({
    idAsignatura: DataTypes.INTEGER,
    bloque: DataTypes.INTEGER,
    dia: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'HorarioAsignatura',
    timestamps: false
  });
  return HorarioAsignatura;
};