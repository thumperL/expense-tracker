const mongoose = require('mongoose');

const { Schema } = mongoose;
const recordSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  amount: {
    type: String,
    required: true,
    default: 0,
  },
});
module.exports = mongoose.model('Record', recordSchema);
