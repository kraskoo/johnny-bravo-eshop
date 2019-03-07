const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  devices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;