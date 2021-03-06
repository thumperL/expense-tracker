const mongoose = require('mongoose');

const { Schema } = mongoose;

const recordSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  merchant: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true,
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
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true,
  },
});
module.exports = mongoose.model('Record', recordSchema);
