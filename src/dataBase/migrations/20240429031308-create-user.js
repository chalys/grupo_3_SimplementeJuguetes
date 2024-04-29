'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.INTEGER
      },
      locality: {
        type: Sequelize.STRING
      },
      postal: {
        type: Sequelize.INTEGER
      },
      street: {
        type: Sequelize.STRING
      },
      streetNumber: {
        type: Sequelize.INTEGER
      },
      floor: {
        type: Sequelize.INTEGER
      },
      betweenSt1: {
        type: Sequelize.STRING
      },
      betweenSt2: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.INTEGER
      },
      indications: {
        type: Sequelize.STRING
      },
      userPicture: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.INTEGER
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
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};