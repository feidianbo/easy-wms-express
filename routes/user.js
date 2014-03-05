var entity = require('../entity');
require('../dao');

exports.list = function (req, res) {
    entity.User.find(function (err, users) {
        res.render('user', {users: users});
    });
}

exports.add = function (req, res) {
    var user = entity.User();
    user.id = 10001;
    user.name = 'abc123';
    user.sex = true;
    user.birth = new Date();
    user.age = 20;
    user.password = '***********';

    user.save(function (err) {
        if (err) {
            console.log('保存用户时出错：' + err);
        } else {
            res.send('增加用户成功');
        }
    });
}

exports.search = function (req, res) {
    var sort = req.param('sort');
    var order = req.param('order') == 'asc' ? '' : '-';
    var page = req.param('page');
    var rows = req.param('rows');

    entity.User
        .find()
        .skip((page - 1) * rows)
        .limit(rows)
        .sort(order + sort)
        .select('id name password sex age birth')
        .exec(function (err, users) {
            if (err) {
                console.log('查询用户时出错：' + err);
                res.send('');
            } else {
                var json = entity.Pager;
                entity.User.count(function (err, count) {
                    json.total = count;
                    json.rows = users;
                    res.send(json);
                });
            }
        }
    );
}

exports.save = function (req, res) {
    var user = entity.User();
    user.save(function (err) {
        if (err) {
            console.log('保存用户表时出错：' + err);
        } else {
            res.send();
        }
    });
}

exports.update = function (req, res) {
    var user = entity.User();
    var _id = req.body._id;
    user.id = req.body.id;
    user.name = req.body.name;
    user.password = req.body.password;
    user.age = req.body.age;

    entity.User.update({_id: _id}, {name: user.name, password: user.password}, {}, function (err) {
        if (err) {
            console.log('更新用户时出错：' + err);
        } else {
            res.send('更新用户成功');
        }
    });
}

exports.delete = function (req, res) {
    var user = entity.User();
    user.delete(function (err) {
        if (err) {
            console.log('删除用户时出错：' + err);
        } else {
            res.send();
        }
    });
}