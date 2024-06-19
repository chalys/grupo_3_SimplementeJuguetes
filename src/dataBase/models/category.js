'use strict';
const sequelizePaginate = require("sequelize-paginate")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      category.hasMany(models.product,{
        foreignKey:"categoryId",
        as:"products"
      })
    }
  }
  category.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'category',
    timestamps: false
  });
  sequelizePaginate.paginate(category)
  return category;
};