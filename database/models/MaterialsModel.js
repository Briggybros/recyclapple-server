const Sequelize = require('sequelize');

/* eslint new-cap: ["error", {"capIsNew": false}] */

/** Class representing a Pushendpoint model for sequelize. */
class MaterialsModel {

    /**
    * @constructor
    * @param {Object} sequelize The Sequelize object.
    */
  constructor(sequelize) {
    this.Materials = sequelize.define('materials', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING,
        field: 'id',
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        field: 'name',
      },
    }, {
      freezeTableName: true, //Model tableName will be same as model name
    });
  }
}

module.exports = {MaterialsModel};