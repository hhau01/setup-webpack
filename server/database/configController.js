const sequelize = require('./postgres');

module.exports = {
  addConfig: (req, res, next) => {
    const name = req.body.configName;
    const config = JSON.stringify(req.body.config);
    sequelize.query(`INSERT INTO configs (name, config) VALUES('${name}', '${config}') RETURNING id, name`)
      .then((response) => {
        res.locals.config = { id: response[0][0].id, name: response[0][0].name };
        console.log('Config added...');
        next();
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },
};
