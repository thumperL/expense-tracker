const mongoose = require('mongoose');

// Default connection path
const { MONGODB_URI } = process.env;

// MongoDB Connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;

// Error Handling
db.on('error', console.error.bind(console, 'MongoDb Atlas [expense-tracker] cluster0 connection error'));

module.exports = db;
