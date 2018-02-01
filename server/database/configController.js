const sequelize = require('./postgres');

module.exports = {
  addConfig: (req, res, next) => {
    const { userid, fullname, username, email, avatar, location } = res.locals.authdata;
    sequelize.query(`INSERT INTO users (userid, fullname, username, email, avatar, location, configs)
      VALUES(${userid}, '${fullname}', '${username}', '${email}', '${avatar}', '${location}', '{}')`)
      .then(() => console.log(`Added user ${username}:${fullname} to DB...`))
      .catch(() => console.log('User not added...'));
    next();
  },
};

// Configs: id(PK) integer name varchar config json
// CREATE TABLE configs(
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(255) NOT NULL,
//   config JSON NOT NULL
// );
