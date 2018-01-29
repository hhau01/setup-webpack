const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const SERVER_PORT = process.env.SERVER_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(SERVER_PORT, () => console.log(`App listening on port ${SERVER_PORT}...`));
