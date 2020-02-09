const express = require('express');
const trackRoute = express.Router();
const mongodb = require('mongodb');
const multer = require('multer');
const ObjectID = require('mongodb').ObjectID;
const { Readable } = require('stream');
let DB = require('../dbConnectionTracks');


trackRoute.get('/metadata', (req, res) => {
  
  var collection = DB.db.collection('images.files');
  var cursor = collection.find({});

  var arr = [];

  cursor.forEach(function(item) {
      if (item != null) {
          arr.push(item);
      }
  }, function(err) {
      res.send(arr);
      // db.close();
    }
  );
  
  });


// Giving Info of all the artist for Browse By artist
trackRoute.get('/artist', (req, res) => {
  
  var collection = DB.db.collection('artist.files');
  
  var cursor = collection.find({});

  var arr = [];

  cursor.forEach(function(item) {
      if (item != null) {
          arr.push(item);
          //console.log(item);
      }
  }, function(err) {
    //console.log(arr)
    res.send(arr);
    
  }
  );
  
    
  });



trackRoute.get('/images/:trackID', (req, res) => {
  try {
    var trackID = new ObjectID(req.params.trackID);
  } catch(err) {
    return res.status(400).json({ message: "Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters" }); 
  }
  res.set('content-type', 'image/jpeg');
  res.set('accept-ranges', 'bytes');

  let bucket = new mongodb.GridFSBucket(DB.db, {
    bucketName: 'images'
  });

  //Returns a readable stream (GridFSBucketReadStream) for streaming file data from GridFS
  let downloadStream = bucket.openDownloadStream(trackID);

  downloadStream.on('data', (chunk) => {
    res.write(chunk);
  });

  downloadStream.on('error', () => {
    res.sendStatus(404);
  });

  downloadStream.on('end', () => {
    //console.log('bye')
    res.end();
  });
  });



// Fetching Artist Image for Browse By Artist
trackRoute.get('/artist/:trackID', (req, res) => {
  try {
    var trackID = new ObjectID(req.params.trackID);
  } catch(err) {
    return res.status(400).json({ message: "Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters" }); 
  }
  res.set('content-type', 'image/jpeg');
  res.set('accept-ranges', 'bytes');

  let bucket = new mongodb.GridFSBucket(DB.db, {
    bucketName: 'artist'
  });

  //Returns a readable stream (GridFSBucketReadStream) for streaming file data from GridFS
  let downloadStream = bucket.openDownloadStream(trackID);

  downloadStream.on('data', (chunk) => {
    res.write(chunk);
  });

  downloadStream.on('error', () => {
    res.sendStatus(404);
  });

  downloadStream.on('end', () => {
    //console.log('bye')
    res.end();
  });
});



trackRoute.get('/songInfo/:trackID', (req, res) => {
  
  var collection = DB.db.collection('images.files');
  collection.findOne({"_id": new ObjectID(req.params.trackID)},function(err,result){
    res.send(result);
  });
  
});



trackRoute.get('/:trackID', (req, res) => {
  try {
    var trackID = new ObjectID(req.params.trackID);
  } catch(err) {
    return res.status(400).json({ message: "Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters" }); 
  }
  res.set('content-type', 'audio/mp3');
  res.set('accept-ranges', 'bytes');

  let bucket = new mongodb.GridFSBucket(DB.db, {
    bucketName: 'tracks'
  });

  //Returns a readable stream (GridFSBucketReadStream) for streaming file data from GridFS
  let downloadStream = bucket.openDownloadStream(trackID);

  downloadStream.on('data', (chunk) => {
    res.write(chunk);
  });

  downloadStream.on('error', () => {
    res.sendStatus(404);
  });

  downloadStream.on('end', () => {
    //console.log('bye')
    res.end();
  });
});



trackRoute.post('/', (req, res) => {

  const storage = multer.memoryStorage()
  const upload = multer({ storage: storage, limits: { fields: 5, fileSize: 6000000, files: 2, parts: 7 }});


  /*
  upload.single('track')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Upload Request Validation Failed" });
    } else if(!req.body.name) {
      return res.status(400).json({ message: "No track name in request body" });
    }
  */

  
      
  upload.fields([{
    name: 'track'
  }, {
    name: 'image'
  }])(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Upload Request Validation Failed" });
    } else if(!req.body.name) {
      return res.status(400).json({ message: "No track name in request body" });
    }
  
  var curCollection = DB.db.collection('images.files');
  var curCursor = curCollection.findOne({"filename" : req.body.name, "metadata.artist" : req.body.artist});
  if(curCursor)
    return res.status(400).json({ message: "Song Already Exits" });

  let metadata = {
    songname: req.body.name,
    artist: req.body.artist,
    album: req.body.album,
    genre : req.body.genre,
    language : req.body.language
  }

  
  let trackName = req.body.name;
  
  // Covert buffer to Readable Stream
  const readableTrackStream = new Readable();
  readableTrackStream.push(req.files.track[0].buffer);
  readableTrackStream.push(null);

  
  let bucket = new mongodb.GridFSBucket(DB.db, {
    bucketName: 'tracks'   //The 'files' and 'chunks' collections will be prefixed with the bucket name followed by a dot.
  });

  
  //Returns a writable stream (GridFSBucketWriteStream) for writing buffers to GridFS
  let uploadStream = bucket.openUploadStream(trackName);
  let id = uploadStream.id;
  readableTrackStream.pipe(uploadStream);

  uploadStream.on('error', () => {
    return res.status(500).json({ message: "Error uploading file" });
  });

  uploadStream.on('finish', () => {
    //console.log(uploadStream)
    //uploadStream.metadata = metadata

      const imgreadableTrackStream = new Readable();
      imgreadableTrackStream.push(req.files.image[0].buffer);
      imgreadableTrackStream.push(null);

      let imgbucket = new mongodb.GridFSBucket(DB.db, {
          bucketName: 'images'   //The 'files' and 'chunks' collections will be prefixed with the bucket name followed by a dot.
        });

      let imguploadStream = imgbucket.openUploadStreamWithId(id, trackName,{metadata :{songname: req.body.name,
        artist: req.body.artist,
        album: req.body.album,
        genre : req.body.genre,
        language : req.body.language}})

          
      imgreadableTrackStream.pipe(imguploadStream)

      imguploadStream.on('error', () => {
          return res.status(500).json({ message: "Error uploading file" });
        });

        imguploadStream.on('finish', () => {
          
          res.redirect('/dashboard')
          //return res.status(201).json({ message: "Both File uploaded successfully, stored under Mongo ObjectID: " + id });
        })
          
  });

  });
  
});
  
  
trackRoute.post('/addArtist', (req, res) => {
  const storage = multer.memoryStorage()
  const upload = multer({ storage: storage, limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 }});
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Upload Request Validation Failed" });
    } else if(!req.body.name) {
      return res.status(400).json({ message: "No Artist name in request body" });
    }
    
    var curCollection = DB.db.collection('artist.files');
    var curCursor = curCollection.findOne({"filename" : req.body.name});
    if(curCursor)
      return res.status(400).json({ message: "Artist Already Exits" });

    let artistName = req.body.name;
    
    // Covert buffer to Readable Stream
    const readableTrackStream = new Readable();
    readableTrackStream.push(req.file.buffer);
    readableTrackStream.push(null);

    let bucket = new mongodb.GridFSBucket(DB.db, {
      bucketName: 'artist'   //The 'files' and 'chunks' collections will be prefixed with the bucket name followed by a dot.
    });

    
    //Returns a writable stream (GridFSBucketWriteStream) for writing buffers to GridFS
    let uploadStream = bucket.openUploadStream(artistName);
    let id = uploadStream.id;
    readableTrackStream.pipe(uploadStream);

    uploadStream.on('error', () => {
      return res.status(500).json({ message: "Error uploading file" });
    });

    uploadStream.on('finish', () => {
      // return res.status(201).json({ message: "File uploaded successfully, stored under Mongo ObjectID: " + id });
      res.redirect('/dashboard')
    });
    });
  });
  
  
module.exports = trackRoute;