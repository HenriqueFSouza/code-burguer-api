"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Users", "admin", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Users", "admin", {
      type: Sequelize.BOOLEAN,
      defaultValue: null,
      allowNull: true,
    })
  },
}
