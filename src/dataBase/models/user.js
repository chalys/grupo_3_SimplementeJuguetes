'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    userName: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    province: DataTypes.INTEGER,
    locality: DataTypes.STRING,
    postal: DataTypes.INTEGER,
    street: DataTypes.STRING,
    streetNumber: DataTypes.INTEGER,
    floor: DataTypes.INTEGER,
    betweenSt1: DataTypes.STRING,
    betweenSt2: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    indications: DataTypes.STRING,
    userPicture: DataTypes.STRING,
    role: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};