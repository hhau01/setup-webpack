const Sequelize = require('sequelize');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const keys = require('../config/keys.js');

const app = express();

const SERVER_PORT = process.env.SERVER_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const sequelize = new Sequelize(keys.POSTGRES_DBNAME, keys.POSTGRES_USERNAME, keys.POSTGRES_PASSWORD, {
//   dialect: 'postgres',
//   host: keys.POSTGRES_URI,
//   port: keys.POSTGRES_PORT,
//   operatorsAliases: Sequelize.Op,
//   logging: false,
// });
// sequelize.authenticate()
//   .then(() => console.log('Connected to Postgres DB...'))
//   .catch(err => console.error('Unable to connect to DB...', err));

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(SERVER_PORT, () => console.log(`App listening on port ${SERVER_PORT}...`));
