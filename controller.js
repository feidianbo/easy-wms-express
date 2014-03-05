require('./dao');
var user = require('./routes/user');

exports.config = function (app, routes) {
    app.get('/', routes.index);
    app.get('/users', user.list);
    app.get('/user/search', user.search);
    app.get('/user/add', user.add);
    app.get('/user/save', user.save);
    app.post('/user/update', user.update);
    app.get('/user/delete', user.delete);
}