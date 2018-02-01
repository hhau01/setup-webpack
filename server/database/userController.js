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
};

// INSERT INTO users(userid, fullname, username, email, location, configs) VALUES(123, 'henry', 'hhau01', 'henry@gmail.com', 'lost angeles', '{1,2,3}');
// Users: userid(PK) integer fullname varchar username varchar avatar varchar email varchar location varchar configs array
// CREATE TABLE users(
//   userid INTEGER PRIMARY KEY,
//   fullname VARCHAR(255) NOT NULL,
//   username VARCHAR(255) NOT NULL,
//   email VARCHAR(255) NOT NULL,
//   avatar VARCHAR(255),
//   location VARCHAR(255),
//   configs INTEGER []
// );

// Configs: id(PK) integer name varchar config json
// CREATE TABLE configs(
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(255) NOT NULL,
//   config JSON NOT NULL
// );
