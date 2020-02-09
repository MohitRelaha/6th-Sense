const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const ObjectID = require('mongodb').ObjectID;
require('../dbConnectionUsers');

var PlaylistSchema = new mongoose.Schema({
  _id:{
    type: ObjectID,
    unique: true,
    required: true
  },
  filename:{
    type: String,
    required: true
  }
});

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  firstname:{
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  lastname:{
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  },
  gender:{
      type:String,
      required: true
  },
  playlist:{
    type:[PlaylistSchema],
    default:null
  }
});
var User = mongoose.model('User', UserSchema);

User.findUsers = function (req,callBack) {
  //console.log('model was called');
  var uname=req.session.username;
  let query={};
  if(uname)
  {
      query = { username : uname}
  }
  User.find(query, callBack);  //call find function of mongoose.

}

User.addUsers = function(req,callBack) {
    let user=req.body;
    console.log(user);
    var salt = bcrypt.genSaltSync(10);
    var hash1 = bcrypt.hashSync(user.password, salt);
    var hash2 = bcrypt.hashSync(user.passwordConf, salt);
    user.password=hash1;
    user.passwordConf=hash2;
    if(user.password === user.passwordConf)
        User.create(user,callBack);
         
}

User.findUserForLogin = function(req,callBack){
  User.findOne({username: req.body.username})
  .exec(function(err,user){
    if(err){
      console.log('error');
      return callBack(err,null)
    }
    else if(!user){
      console.log('user not found');
      return callBack(err,null);
    }
       bcrypt.compare(req.body.password, user.password).then((res) => {
        // res === true
        if(res === true)
          callBack(err,user);
        else
          callBack(err,null);
    });
 })
}

User.findUserProfile = function(req,callBack) {
  //console.log('model was called');
  var uname=req.session.username;
  let query={};
  if(uname)
  {
      query = { username : uname}
  }
  User.findOne(query, callBack);  //call find function of mongoose.

}

User.addToPlaylist = function(req,callBack){
  
  // let currUser = User.findOne({username: req.session.username});
  // currUser.playlist.push(id);
  // currUser.save();
  let newSong = {_id:req.query.id,filename:req.query.filename} 

  User.findOneAndUpdate(
    { username: req.session.username }, 
    { $push: { playlist: newSong  } },
    callBack)
}


module.exports = User;