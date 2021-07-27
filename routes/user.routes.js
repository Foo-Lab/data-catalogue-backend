const user = require('../controllers/user.controller.js');
//const User = require('../models/user.model.js');

module.exports = (app) => {
    app.post('/user', user.create);
    app.get('/user', user.findAll);
    app.get('/user/:id', user.findOne);
    app.put('/user/:id', user.update);
    app.delete('/user/:id', user.remove);
};
