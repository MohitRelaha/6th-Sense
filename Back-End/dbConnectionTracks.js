const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

//Connect Mongo Driver to MongoDB.
//var db;
MongoClient.connect('mongodb://localhost/trackDB', (err, database) => {
  if (err) {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
  }
  console.log("Connected to TracksDB")
  module.exports.db = database;
  //console.log("INSIDE " + db)
});

//console.log("OUTSIDE " + db)


