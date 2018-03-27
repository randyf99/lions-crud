const mongoose = require('mongoose');

const LionSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: Number },
  pride: { type: String },
  gender: { type: String },
  id: { type: String }
});

module.exports = mongoose.model('lion', LionSchema);
