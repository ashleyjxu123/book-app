const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

require('dotenv').config({path: `${__dirname}/../config.env`});
const connectionString = process.env.ATLAS_URI || "";

const db = async () => {
    try {
        await mongoose.connect(connectionString,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "my_database"
          });
        console.log(`Connected to MongoDB Atlas cluster: ${mongoose.connection.host}, database: ${mongoose.connection.db.databaseName}`);
      } catch(e) {
        console.error(e);
    }

    mongoose.connection.on('error', err => {
      logError(err);
    });
  };

module.exports = db;
