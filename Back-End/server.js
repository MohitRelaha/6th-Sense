const express = require('express');
const bodyParser= require("body-parser");
const app = express();
var path = require('path');
var user = require('./routes/users');
var trackRoute = require('./routes/tracks');
require('./dbConnectionUsers')
var session = require('express-session');
const User = require('./models/users')
require('dotenv').config()


var cookieValidator = (req, res, next) => {
  if (req.session.username) {
      User.findUsers(req, (err, res) => {
          if (err) res.status(401).send({message:"User not authenticated"});
          if (res && res.length == 0) {
              res.status(401).send({message:"User not authenticated"});
          }
          if (res && res.length > 0) {
              next();
          }
      })
  } else {
      res.status(401).send({message:"User not authenticated"});
  }
}


app.use(bodyParser.json());




app.use(session({
  name: 'sid',
  resave: false,
  saveUninitialized: false,
  secret: process.env.SECRET_KEY,
  cookie: {
      maxAge: 3600000
  },
  key:"sixthsense"
}))

//app.use("/",express.static('public'))
app.use(express.static('public'))




//app.use('/', express.static('public'));
// app.use("/dashboard",express.static('public'))
// app.use("/login",express.static('public'))

//app.use(express.static(__dirname + '/public'));
//app.use(express.static(path.join(__dirname, 'public')));
//  app.use('/img',express.static(path.join(__dirname, 'public/images')));
//  app.use('/js',express.static(path.join(__dirname, 'public/javascripts')));
//  app.use('/css',express.static(path.join(__dirname, 'public/stylesheets')));
//"C:\WEB\With Routes 6th Sense\6thsense"

// app.use(express.static(path.join(__dirname, 'public')));
// -app.get('/', function (req, res) {
// +app.get('/*', function (req, res) {
//    res.sendFile(path.join(__dirname, 'public', 'index.html'));
//  });

// app.use('public', express.static(path.join(__dirname, 'build')));
// app.use('public', express.static(path.join(__dirname, 'public')));
// app.use("/",express.static('public'))
// // Always return the main index.html



app.use("*",(req,res,next)=>{
  //console.log("Middle ware is called");
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader("Access-Control-Allow-Headers","Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With,Accept");
  res.setHeader("Access-Control-Allow-Methods","*");
  res.setHeader("Access-Control-Allow-Credentials","true");
  
  next();
})


app.use('/users',user);
app.use('/tracks',cookieValidator ,trackRoute);
//app.use('/tracks' ,trackRoute);
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './6thsense','build','index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})


app.listen(3005, () => {
  console.log("App listening on port 3005!");
});
