const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

require('dotenv').config({path: `${__dirname}/../config.env`});
console.log(process.env.ATLAS_URI);
const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

const db = async () => {
    try {
        conn = await client.connect();
      } catch(e) {
        console.error(e);
    }
  };

module.exports = db;
