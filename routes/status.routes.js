const status = require('../controllers/status.controller.js');
//const status = require('../models/status.model.js');

module.exports = (app) => {
    app.post('/status', status.create);
    app.get('/status', status.findAll);
    app.get('/status/:id', status.findOne);
    app.put('/status/:id', status.update);
    app.delete('/status/:id', status.remove);
};
