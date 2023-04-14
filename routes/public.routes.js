const user = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/user', user.create);
    app.post('/user/auth', user.auth);

};
