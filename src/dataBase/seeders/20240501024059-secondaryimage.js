"use strict";

const productsJSON = require("../../dataBase/products.json");
const secondaryimagesDBMapped = productsJSON.map((p) => {
  const images = p.secondImg.map((img) => {
    return {
      file: img,
      productId: p.id,
    };
  });
  return images
  // console.log(images)
}).flat(1);
//console.log(secondaryimagesDBMapped.flat(1))

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("secondaryimages", secondaryimagesDBMapped, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("secondaryimages", null, {});
  },
};
