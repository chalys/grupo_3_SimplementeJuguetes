'use strict';
const provinceJSON = require('../province.json')
const provincemap = provinceJSON.map((p)=>{
  return{
    code: p.code,
    name: p.name,
  }
  })
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('provinces',provincemap, {});
  
  },

  async down (queryInterface, Sequelize) {
 
      await queryInterface.bulkDelete('provinces', null, {});
 
  }
};
