const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/usersDB',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


//instance of connection
var usersdb = mongoose.connection;

//for error
usersdb.on('error', function() {
    console.log("Error connecting to usersdb");
})

//for success
usersdb.once('open', function() {
    console.log("Connected to usersdb");
});
