const user = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/user', user.create);
    app.get('/user', user.findAll);
    app.get('/user/:id', user.findOne);
    app.put('/user/:id', user.update);
    app.delete('/user/:id', user.remove);
    app.post('/user/login', user.login);
};
