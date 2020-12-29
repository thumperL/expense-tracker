const mongoose = require('mongoose');

// Default connection path
const connectionRemote = process.env.MONGODB_URI;
console.log(connectionRemote);

// MongoDB Connection
mongoose.connect(connectionRemote, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;

// Error Handling
db.on('error', console.error.bind(console, 'MongoDb Atlas [expense-tracker] cluster0 connection error'));

module.exports = db;
