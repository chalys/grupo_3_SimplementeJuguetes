'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    static associate(models) {
      role.hasMany(models.user,{
        foreignKey:"roleId",
        as:"users"
      })
    }
  }
  role.init({
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'role',
  });
  return role;
};