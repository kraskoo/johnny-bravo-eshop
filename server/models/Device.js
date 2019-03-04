const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  characteristics: [{ type: String }],
  category: { type: String, ref: 'Category' },
  quantity: { type: Number, required: true, min: 0, max: 1000 },
  creationDate: { type: Date, required: true, default: Date.now }
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;