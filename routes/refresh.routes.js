const refreshController = require('../controllers/refresh.controller');

module.exports = (app) => {
    app.get('/refresh', refreshController.handleRefresh);
};
