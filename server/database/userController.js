const sequelize = require('./postgres');

module.exports = {
  addUser: (profile, cb) => {
    profile = JSON.parse(profile);
    const authdata = {
      userid: profile.id,
      fullname: profile.name,
      username: profile.login,
      email: profile.email,
      avatar: profile.avatar_url,
      location: profile.location,
      url: profile.url,
      htmlUrl: profile.html_url,
    }
    const { userid, fullname, username, email, avatar, location } = authdata;
    sequelize.query(`INSERT INTO users (userid, fullname, username, email, avatar, location, configs)
      VALUES(${userid}, '${fullname}', '${username}', '${email}', '${avatar}', '${location}', '{}')`)
      .then(() => {
        cb(authdata);
        console.log(`Added user ${username}:${fullname} to DB...`);
      })
      .catch((error) => {
        cb(void 0);
        console.log('User not added...');
      });
  },
  getUser: (id, cb) => {
    sequelize.query(`SELECT * FROM users WHERE userid=${id}`)
      .then(response => cb(response[0][0]))
      .catch(() => cb(void 0));
  },
  addUserConfig: (req, res) => {
    const { userid } = req.user;
    const { id, name } = res.locals.config;
    sequelize.query(`UPDATE users SET configs = configs || array['{"id":${id},"name":"${name}"}'::json] WHERE userid = ${userid};`)
      .then((response) => {
        console.log('Updated user...');
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },
};

// UPDATE users SET configs = configs || '{'{"id":1,"name":"react"}'}' WHERE userid = 12615402;
// UPDATE users SET configs = configs || array['{"id":2,"name":"react2"}'::json] WHERE userid = 12615402;