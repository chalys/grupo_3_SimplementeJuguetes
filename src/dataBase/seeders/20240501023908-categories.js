'use strict';

const categoriesJSON = require("../../dataBase/category.json")

const categoriesDBMapped = categoriesJSON.map(c =>{
  return{
    name:c.name,
    description:c.description
  }
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
await queryInterface.bulkInsert('categories', categoriesDBMapped , {});

  },

  async down (queryInterface, Sequelize) {
await queryInterface.bulkDelete('categories', null, {});

  }
};
