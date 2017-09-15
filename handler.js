var db = require('./db.js');
module.exports.get = {};
module.exports.post = {};

module.exports.get.index = function (req, res) {
    res.render('index');
};
module.exports.get.students = function (req, res) {
    db.findAll('students', function (err, docs) {
        if (err) {
            throw err;
        };
        res.render('students', {
            list: docs
        }); //渲染students,模板数据为docs
    })
};
module.exports.get.add = function (req, res) { //先渲染add页面
    db.findAll('cities', function (err, doc_city) {
        if (err) {
            throw err;
        };
        db.findAll('majors', function (err, doc_major) { //先确定city与majors渲染完毕
            if (err) {
                throw err;
            };

            res.render('add', {
                cities: doc_city,
                majors: doc_major
            });

        })
    })
};
//添加post请求数据
module.exports.post.add = function (req, res) {
    var model = {
        sno: req.body.sno,
        sname: req.body.sname,
        sgender: (req.body.sgender === 'F') ? '女' : '男', //判断男女
        sbirthday: req.body.sbirthday,
        sphone: req.body.sphone,
        saddr: req.body.saddr,
        smajor: req.body.smajor
    };
    db.insertone('students', model, function (err, result) {
        if (err) {
            throw err;
        }
        res.redirect('/students');
    })
};
module.exports.get.info = function (req, res) {
    var objid = db.objId(req.query._id);
    db.findOne('students', {
        _id: objid
    }, function (err, result) {
        if (err) {
            throw err;
        };
        res.render('info', {
            item: result
        });

    })
};
module.exports.get.delete = function (req, res) {
    var objid = db.objId(req.query._id);
    db.deleteOne('students', {
        _id: objid
    }, function (err, result) {
        if (err) {
            throw err;
        };
        res.redirect('/students');
    })
};
module.exports.get.edit =function(req, res){//渲染编辑页面
    var objid = db.objId(req.query._id);
    //找到当前对应的渲染
    db.findOne('students', { _id: objid},function(err,doc_students){
        if (err) {
            throw err;
        };
        db.findAll('cities', function (err, doc_city) {
            if (err) {
                throw err;
            };
            db.findAll('majors', function (err, doc_major) { //先确定city与majors渲染完毕
                if (err) {
                    throw err;
                };

                res.render('edit', {
                    cities: doc_city,
                    majors: doc_major,
                    item:doc_students
                });

            })
        })
    })
   
};
module.exports.post.edit =function(req, res){
    var objid =db.objId(req.body._id);//获取请求体中的_id
    var model = {
        sno: req.body.sno,
        sname: req.body.sname,
        sgender: (req.body.sgender === 'F') ? '女' : '男', //判断男女
        sbirthday: req.body.sbirthday,
        sphone: req.body.sphone,
        saddr: req.body.saddr,
        smajor: req.body.smajor
    };
    db.editone('students',{_id:objid},model,function(err, result){
        if(err){
            throw err;
        };
        res.redirect('/students');
    })
}