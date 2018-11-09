var fs = require('fs');
var express = require('express');
var router = express.Router();
var list = require('./lists/todoList.json');
var filePath = __dirname + '/lists/todoList.json';

router.get('/api/todos', function(req, res, next) {
  res.render('index', {list:  list.tasks});
});

router.post("/api/todos", function(req, res) {

	fs.readFile(filePath, 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      let obj = JSON.parse(data);
      obj.tasks.push(req.body);
      updateFile(JSON.stringify(obj, null, 4));
      res.redirect('/');
    }
  });
});

router.put("/api/todos", function(req, res) {
	fs.readFile(filePath, 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      let obj = JSON.parse(data);
      (obj.tasks).forEach(function(result, index) {
        if(result.name === (req.body.name)) {
          obj.tasks[index] = req.body;
          if(result.status === "Complete"){
            obj.tasks[index].status = "In-Progress";
          }else {
            obj.tasks[index].status = "Complete";
          }
        }
      });
      updateFile(JSON.stringify(obj, null, 4));
      res.redirect('/');
    }
  });
});

router.delete("/api/todos/:id", function(req, res) {
  let id =  (req.params.id).toString();

	fs.readFile(filePath, 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      let obj = JSON.parse(data);
      (obj.tasks).forEach(function(result, index) {
        if(index === (id - 1)) {
          (obj.tasks).splice(index, 1);
        }
      });
      updateFile(JSON.stringify(obj, null, 4));
      res.redirect('/');
    }
  });
});

function updateFile(newData){
  fs.writeFile(filePath, newData, 'utf8', function(err){
          if(err){
            console.log(err);
          }
  });
}

module.exports = router;
