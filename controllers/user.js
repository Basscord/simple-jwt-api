var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.users = function(req, res) {
  User.find({}, function (err, articles) {
    if (err) {
      res.send(err);
    }
    res.json(articles);
  });
};

module.exports.readUser = function(req, res) {
  User.find({
    _id: req.params.user_id
  }, function (err, article) {
    if (err) {
      res.send(err);
    }
    res.json(article);
  });
};

module.exports.updateUser = function(req, res) {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) {
      res.status(404).json(err);
      return;
    }
    if(user) {
      // TODO: compare password before accepting new password
      user.setPassword(req.body.password);
      token = user.generateJwt();
      user.save(function(err) {
        if (err) {
          res.status(404).json(err);
        }
        res.status(200);
      });
    } else {
      // If user is not found
      res.status(401).json('User Not Found');
    }
  });
};

module.exports.deleteUser = function(req, res) {
  User.remove({
    _id: req.params.user_id
  }, function (err, article) {
    if (err) {
      res.send(err);
    }
    res.json(article);
  });
};
