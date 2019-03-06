const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  devices: [{ type: String, ref: 'Device' }]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;