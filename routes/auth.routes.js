const auth = require('../controllers/auth.controller');

module.exports = (app) => {
    app.post('/auth/login', auth.login);
};
