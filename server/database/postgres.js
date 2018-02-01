const Sequelize = require('sequelize');

const { POSTGRES_DBNAME, POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_URI, POSTGRES_PORT } = require('../../config/keys.js');

const sequelize = new Sequelize(POSTGRES_DBNAME, POSTGRES_USERNAME, POSTGRES_PASSWORD, {
  dialect: 'postgres',
  host: POSTGRES_URI,
  port: POSTGRES_PORT,
  operatorsAliases: Sequelize.Op,
  logging: false,
});

module.exports = sequelize;
