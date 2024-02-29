const MongoClient = require('mongodb').MongoClient;

// get environment variables
require('dotenv').config();
const url = process.env.MONGODB_URI;

/**
 * 
 * @returns {MongoClient} MongoClient object of the MONGODB_URI environment variable
 */
const getMongoClient = () =>
{
    return new MongoClient(url);
};

module.exports = { getMongoClient };