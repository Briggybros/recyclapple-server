const Sequelize = require('sequelize');
const {AuthModel} = require('./models/AuthModel.js');
const {MaterialsModel} = require('./models/MaterialsModel.js');
const {ItemModel} = require('./models/ItemModel.js');
const {InstructionModel} = require('./models/InstructionModel.js');

/** A class representing the database */
class Database {


  /**
  * @constructor
  */
  constructor() {
    this.createSequelize()
      .then(() => {
        return this.createModels();
      })
      .then(() => {
        this.setupRelations().catch(console.log);
      });
  }

  /**
* @param {String} env The current environment.
* @return {Promise} A promise of a created database.
*/
createSequelize() {
  /* Use promise to return once database querying is complete. */
  return new Promise((resolve, reject) => {
    this.sequelize = new Sequelize('recyclapple', 'recyclapple', 'password', {
      dialect: 'sqlite',
      storage: './database.sqlite',
    });
    resolve();
  });
}

/**
  * @return {Promise} A promise of a database with tables.
  */
  createModels() {
    /* Use promise to return once database querying is complete. */
    return new Promise((resolve, reject) => {
      this.authModel = new AuthModel(this.sequelize);
      this.itemModel = new ItemModel(this.sequelize);
      this.instructionModel = new InstructionModel(this.sequelize);
      this.materialsModel = new MaterialsModel(this.sequelize);
      resolve();
    });
  }

  /**
  * @return {Promise} A promise of a database with foreignKey relationships.
  */
  setupRelations() {
    /* Use promise to return once database querying is complete. */
    return new Promise((resolve, reject) => {
      /* Make all events belong to some user. */
      this.instructionModel.Instruction.belongsTo(this.authModel.Auth, {
        foreignKey: {
          field: 'authId',
          allowNull: false,
        },
        onDelete: 'CASCADE',
      });
      this.instructionModel.Instruction.belongsTo(this.materialsModel.Materials, {
         foreignKey: {
           field: 'materialId',
           allowNull: false,
         },
         onDelete: 'CASCADE',
       });

      //
      // // /* Make all users have people they're following */
      // // this.followersModel.Follower.belongsTo(this.userModel.User, {
      // //   foreignKey: {
      // //     field: 'userId',
      // //     allowNull: false,
      // //   },
      // //   onDelete: 'CASCADE',
      // // });
      // /* Make all followers be following a user  */
      // this.userModel.User.hasMany(this.this.userModel.User
      //   // foreignKey: {
      //   //   field: 'followingId',
      //   //   allowNull: false,
      //   // },
      //   // onDelete: 'CASCADE',
      // );
      resolve();
    });
  }

  /** Cleanly close the database */
  close() {
    this.sequelize.close();
  }
}

module.exports = {Database};