'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class destination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  destination.init({
    city: DataTypes.STRING,
    stateOrCountry: DataTypes.STRING,
    image: DataTypes.STRING,
    population: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'destination',
  });
  return destination;
};