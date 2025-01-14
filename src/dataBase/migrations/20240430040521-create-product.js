'use strict';

const { toDefaultValue } = require('sequelize/lib/utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      manufacturer: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      mark: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      sku: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      available: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      collection: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName:"categories"
          },
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      line: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      character: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      characterVersion: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      minAge: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      height: {
        type: Sequelize.SMALLINT
      },
      depth: {
        type: Sequelize.SMALLINT
      },
      width: {
        type: Sequelize.SMALLINT
      },
      materials: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      scale: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      articulated: {
        type: Sequelize.BOOLEAN
      },
      collectable: {
        type: Sequelize.BOOLEAN
      },
      accessories: {
        type: Sequelize.BOOLEAN
      },
      bobbleHead: {
        type: Sequelize.BOOLEAN
      },
      firstImg: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      deletedAt:{
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};