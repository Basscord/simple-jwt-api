var mongoose = require('mongoose');
var Article = mongoose.model('Article');

module.exports.articles = function(req, res) {
  Article.find({}, function (err, articles) {
    if (err) {
      res.send(err);
    }
    res.status(200).json(articles);
  });
};

module.exports.articlesByTitle = function(req, res) {
  Article.find({}, null, {sort: {title: 1}}, function (err, articles) {
    if (err) {
      res.send(err);
    }
    res.status(200).json(articles);
  });
};

module.exports.articlesByDate = function(req, res) {
  Article.find({}, null, {sort: '-date'}, function (err, articles) {
    if (err) {
      res.send(err);
    }
    res.json(articles);
  });
};

module.exports.createArticle = function(req, res) {
  var date = Date.now();
  if (req.body.date) {
    date = req.body.date;
  }
  Article.create({
    title: req.body.title,
    description: req.body.description,
    date: date
  }, function (err, article) {
    if (err) {
      res.send(err);
    }
    res.status(200).json(article);
  });
};

module.exports.readArticle = function(req, res) {
  Article.find({
    _id: req.params.article_id
  }, function (err, article) {
    if (err) {
      res.send(err);
    }
    res.json(article);
  });
};

module.exports.updateArticle = function(req, res) {
  Article.update({
    _id: req.params.article_id
  }, {
    title: req.body.title,
    description: req.body.description,
    date: req.body.date
  }, function (err, article) {
    if (err) {
      res.send(err);
    }
    res.status(200).json(article);
  });
};

module.exports.deleteArticle = function(req, res) {
  Article.remove({
    _id: req.params.article_id
  }, function (err, article) {
    if (err) {
      res.send(err);
    }
    res.json(article);
  });
};
