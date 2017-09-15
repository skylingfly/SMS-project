var express = require('express');
var path = require('path');
//加载配置模块
var config = require('./config.js');
//加载路由
var router = require('./router.js');
//调用express
var app = express();

//加载ejs
var ejs = require('ejs');
//加载中间件
var bodyparser = require('body-parser');


//配置模板引擎
//1.模板文件存放的位置
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);//自定义引擎
app.set('view engine', 'html');//换为html


//获取post请求体并转换为对象
app.use(bodyparser.urlencoded({ extended: true }));



//路由模块调用，注册路由
app.use(router);

//启动服务
app.listen(config.port,function(){
    console.log('http://localhost:'+config.port);
})