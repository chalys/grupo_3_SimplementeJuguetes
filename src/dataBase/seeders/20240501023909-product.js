"use strict";

const productsJSON = require("../../dataBase/products.json");

const productsDBMapped = productsJSON.map((p) => {
  return {
    name: p.name,
    manufacturer: p.manufacturer,
    mark: p.mark,
    sku: p.sku,
    available: p.available,
    colection: p.colection,
    price: p.price,
    line: p.line,
    character: p.character,
    characterVersion: p.characterVersion,
    minAge: p.minAge,
    height: p.height,
    depth: p.depth,
    width: p.width,
    materials: p.materials,
    scale: p.scale,
    articulated: p.articulated,
    collectable: p.collectable,
    accessories: p.accessories,
    bobblehead: p.bobblehead,
    firstImg: p.firstImg,
    description: p.description,
  };
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", productsDBMapped, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
