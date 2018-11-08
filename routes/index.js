var express = require('express');
var router = express.Router();
var list = require('./lists/todoList.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {list:  list.tasks});
});

module.exports = router;
