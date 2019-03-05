const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  jwtString: { type: String, required: true },
  user: { type: String, required: true, ref: 'User' }
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;