//获取数据库
var mongodb = require('mongodb');
var config = require('./config.js');
//链接db
function conndb(callback) {
    var MongoClient = mongodb.MongoClient;
    MongoClient.connect(config.connstr, function (err, db) {
        callback(err, db);
    })
};
//创建链接db的查询所有数据功能,因为查询为异步所以在里面链接成功后执行回调
module.exports.findAll = function (collectionname, callback) {
    conndb(function (err, db) {
        if (err) {
            throw err;
        };
        db.collection(collectionname).find().toArray(function (err, docs) { //确认几何中数据
            db.close();
            //关闭db;
            callback(err, docs);
        })
    })
};
module.exports.insertone = function (collectionname, data, callback) {
    conndb(function (err, db) {
        if (err) {
            throw err;
        };
        db.collection(collectionname).insertOne(data, function (err, result) {
            db.close();
            callback(err, result);
        })
    })
};
//获取id
module.exports.objId = function (strid) {
    return new mongodb.ObjectID(strid);
};
//查询一个
module.exports.findOne = function (collectionname, filter, callback) { //有条件查询
    conndb(function (err, db) {
        if (err) {
            throw err;
        };
        db.collection(collectionname).findOne(filter, function (err, result) {
            db.close();
            callback(err, result);
        })
    })
};
//删除一个
module.exports.deleteOne = function (collectionname, filter, callback) { //有条件查询
    conndb(function (err, db) {
        if (err) {
            throw err;
        };
        db.collection(collectionname).deleteOne(filter, function (err, result) {
            db.close();
            callback(err, result);
        })
    })
};
//修改一个
module.exports.editone = function (collectionname, filter, data, callback) {
    conndb(function (err, db) {
        if (err) {
            throw err;
        };
        db.collection(collectionname).updateOne(filter, data, function (err, result) {
            db.close();
            callback(err, result);
        })
    })
};