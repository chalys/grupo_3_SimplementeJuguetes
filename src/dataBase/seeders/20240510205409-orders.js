"use strict";
const ordersJSON = require("../../database/orders.json");
const usersJSON = require("../../database/usuarios.json");
const ordersDBMapped = ordersJSON.map((o) => {
  const user = usersJSON.find((u) => u.userName === o.user);
  return {
    total: o.total,
    userId: user ? user.id : null,
    state: o.state,
  };
});

//console.log(ordersDBMapped);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("orders", ordersDBMapped, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("orders", null, {});
  },
};
