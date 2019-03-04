const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');
const requiredMessaage = '{PATH} is required';

const userSchema = new mongoose.Schema({
  email: { type: String, required: requiredMessaage, unique: true },
  username: { type: String, required: requiredMessaage },
  salt: { type: String, required: requiredMessaage },
  password: { type: String, required: requiredMessaage },
  roles: [{ type: String, enum: [ 'Admin', 'Regular' ] }]
});

userSchema.method(/* Don't use arrow functions in here!!! */ {
  authenticate: function (password) {
    return encryption.generateHashedPassword(this.salt, password) === this.password;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
module.exports.seedAdminUser = () => {
  User.find({}).then(users => {
    if (users.length > 0) {
      return;
    }

    const salt = encryption.generateSalt();
    const password = encryption.generateHashedPassword(salt, 'admin');
    User.create({
      email: 'admin@admin.com',
      username: 'admin',
      salt: salt,
      password: password,
      roles: [ 'Admin' ]
    });
  });
};