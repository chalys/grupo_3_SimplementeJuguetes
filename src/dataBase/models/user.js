"use strict";
const sequelizePaginate = require("sequelize-paginate");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.belongsTo(models.role, {
        foreignKey: "roleId",
        as: "Role",
      });
    }
  }
  user.init(
    {
      socialId: DataTypes.STRING,
      provider: DataTypes.STRING,
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
      roleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  sequelizePaginate.paginate(user);
  return user;
};
