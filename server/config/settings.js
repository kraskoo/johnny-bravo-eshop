const path = require('path');
const root = path.normalize(path.join(__dirname, '/../'));

module.exports = {
  common: {
    jwtSecretKey: 'j0hnn8 brav0'
  },
  requirements: {
    minUsernameLength: 4,
    minPasswordLength: 5
  },
  development: {
    rootPath: root,
    db: 'mongodb://localhost:27017/johnny-bravo-eshop',
    port: 65535
  },
  production: {
    port: process.env.PORT
  }
};