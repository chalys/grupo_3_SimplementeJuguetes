'use strict';
const roleJSON = require('../role.json')
const rolemap = roleJSON.map((r)=>{
return{
  role: r.name,
}
})
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
      await queryInterface.bulkInsert('roles',rolemap, {});
    
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.bulkDelete('roles', null, {});
     
  }
};
