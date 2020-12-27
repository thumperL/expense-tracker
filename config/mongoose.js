const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:bjMHZjciE2mLXUVDqA6E@cluster0.sgezw.mongodb.net/expense-tracker?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', () => {
  console.log('MongoDb Atlas connection error!');
});
db.once('open', () => {
  console.log('MongoDb Atlas [expense-tracker] cluster0 connected!');
});
module.exports = db;
