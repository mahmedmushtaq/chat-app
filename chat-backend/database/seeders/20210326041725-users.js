"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", [
      {
        firstName: "John",
        lastName: "Toe",
        email: "john@gmail.com",
        password: bcrypt.hashSync("1234", 10),
        gender: "male",
      },
      {
        firstName: "Sam",
        lastName: "Smith",
        email: "sam.smith@gmail.com",
        password: bcrypt.hashSync("1234", 10),
        gender: "male",
      },
      {
        firstName: "Jan",
        lastName: "Doe",
        email: "jan.doe@gmail.com",
        password: bcrypt.hashSync("1234", 10),
        gender: "female",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
