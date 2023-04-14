const user = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/user', user.create);
    app.get('/user', user.findAll);
    app.get('/user/:id', user.findOne);
    app.get('/user/username/:username', user.checkUsernameExists);
    app.get('/user/email/:email', user.checkEmailExists);
    app.put('/user/:id', user.update);
    app.delete('/user/:id', user.remove);
    // app.post('/user/auth', user.auth);
};
