var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.signup = function(req, res) {
  var user = new User();
  user.username = req.body.username;
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) {
      res.status(404).json(err);
      return;
    }
    if(user){
      res.status(401).json('Username is already taken');
    }
    else {
      user.setPassword(req.body.password);
      user.save(function(err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });
      });
    }
  });
};

module.exports.signin = function(req, res) {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) {
      res.status(404).json(err);
      return;
    }
    if(user){
      if (!user.validPassword(req.body.password)) {
        res.status(401).json('Password is wrong');
      } else {
        token = user.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });  
      }
    } else {
      // If user is not found
      res.status(401).json('User Not Found');
    }
  });
};