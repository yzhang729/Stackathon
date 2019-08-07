const Sequelize = require('sequelize');
const db = require('./database');
// const crypto = require('crypto');
// const _ = require('lodash');

const Users = db.define(
  'users',
  {
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
    },
    salt: {
      type: Sequelize.STRING,
    },
  }
  // {
  //   hooks: {
  //     beforeCreate: setSaltAndPassword,
  //     beforeUpdate: setSaltAndPassword,
  //   },
  // }
);

// // instance methods
// Users.prototype.correctPassword = function(candidatePassword) {
//   console.log('password is', candidatePassword);
//   return Users.encryptPassword(candidatePassword, this.salt) === this.password;
// };

// Users.prototype.sanitize = function() {
//   return _.omit(this.toJSON(), ['password', 'salt']);
// };

// // class methods
// Users.generateSalt = function() {
//   return crypto.randomBytes(16).toString('base64');
// };

// Users.encryptPassword = function(plainText, salt) {
//   const hash = crypto.createHash('sha1');
//   hash.update(plainText);
//   hash.update(salt);
//   return hash.digest('hex');
// };

// function setSaltAndPassword(user) {
//   // we need to salt and hash again when the user enters their password for the first time
//   // and do it again whenever they change it
//   if (user.changed('password')) {
//     user.salt = Users.generateSalt();
//     user.password = Users.encryptPassword(user.password, user.salt);
//   }
// }

module.exports = Users;
