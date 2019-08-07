const Sequelize = require('sequelize');
const db = require('./database');

const Fridge = db.define('fridge', {
  food: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  expiration: {
    type: Sequelize.DATE,
  },
});

module.exports = Fridge;
