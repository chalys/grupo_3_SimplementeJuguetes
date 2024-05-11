"use strict";

const ordersJSON = require("../../database/orders.json");
const productsJSON = require("../../dataBase/products.json");

const ordersProductsDBMapped = ordersJSON.map((ord) => {
  const productMapped = ord.products.map((productOrd) => {
    const productFind = productsJSON.find((productDB) => {
      return productDB.name === productOrd.name;
    });
    return {
      orderId: ord.id,
      productId: productFind ? productFind.id : null,
      quantity: productOrd.quantity,
    };
  });
  return productMapped
}).flat(1);
//console.log(ordersProductsDBMapped);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("orderproducts", ordersProductsDBMapped, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("orderproducts", null, {});
  },
};
