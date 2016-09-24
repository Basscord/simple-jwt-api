var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');
var config = require('../config/development');
var authenticationCtrl = require('../controllers/authentication');
var articleCtrl = require('../controllers/article');
var userCtrl = require('../controllers/user');

var auth = expressJwt({
  secret: config.secret
});

router.use('/api', auth);
router.post('/sign-up', authenticationCtrl.signup);
router.post('/sign-in', authenticationCtrl.signin);
router.get('/api/users/:user_id', userCtrl.readUser);
router.put('/api/users/:user_id', userCtrl.updateUser);
router.delete('/api/users/:user_id', userCtrl.deleteUser);
router.get('/api/articles', articleCtrl.articles);
router.get('/api/feed/title', articleCtrl.articlesByTitle);
router.get('/api/feed/date', articleCtrl.articlesByDate);
router.post('/api/articles/:article_id', articleCtrl.createArticle);
router.get('/api/articles/:article_id', articleCtrl.readArticle);
router.put('/api/articles/:article_id', articleCtrl.updateArticle);
router.delete('/api/articles/:article_id', articleCtrl.deleteArticle);
module.exports = router;
