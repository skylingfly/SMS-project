var express = require('express');
var Router = express();
var handler = require('./handler.js');
Router.get('/',handler.get.index);
Router.get('/index',handler.get.index);
Router.get('/students',handler.get.students);
Router.get('/add',handler.get.add);
Router.post('/add',handler.post.add);
Router.get('/info',handler.get.info);
Router.get('/delete',handler.get.delete);
Router.get('/edit',handler.get.edit);
Router.post('/edit',handler.post.edit);





module.exports = Router;