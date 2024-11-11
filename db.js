const mongoose = require('mongoose');

class DbConnection {
  async connect() {
    try {
      await mongoose.connect('mongodb://localhost:27017/chatUsers');
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
}

module.exports = DbConnection;
