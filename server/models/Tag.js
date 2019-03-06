const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  devices: [{ type: String, ref: 'Device' }]
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;