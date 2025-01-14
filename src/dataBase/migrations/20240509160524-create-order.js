'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      total: {
        //type: Sequelize.INTEGER
        type: Sequelize.DECIMAL(10,2)
      },
      userId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName:"users",
          },
          key:"id",
        },
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      },
      state: {
        type: Sequelize.STRING(20)
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
    await queryInterface.dropTable('orders');
  }
};