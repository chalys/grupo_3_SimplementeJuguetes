'use strict';
const sequelizePaginate = require("sequelize-paginate")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.belongsTo(models.role, {
        foreignKey: "role",
        as: "Role" 
      })
    }
  }
  user.init({
    userName: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    province: DataTypes.STRING,
    locality: DataTypes.STRING,
    postal: DataTypes.INTEGER,
    street: DataTypes.STRING,
    streetNumber: DataTypes.INTEGER,
    floor: DataTypes.INTEGER,
    betweenSt1: DataTypes.STRING,
    betweenSt2: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    indications: DataTypes.STRING,
    userPicture: DataTypes.STRING,
    role: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  sequelizePaginate.paginate(user)
  return user;
};