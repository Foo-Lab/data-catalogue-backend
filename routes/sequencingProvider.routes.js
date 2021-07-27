const sequencingProvider = require('../controllers/sequencingProvider.controller.js');
//const sequencingProvider = require('../models/sequencingProvider.model.js');

module.exports = (app) => {
    app.post('/sequencingProvider', sequencingProvider.create);
    app.get('/sequencingProvider', sequencingProvider.findAll);
    app.get('/sequencingProvider/:id', sequencingProvider.findOne);
    app.put('/sequencingProvider/:id', sequencingProvider.update);
    app.delete('/sequencingProvider/:id', sequencingProvider.remove);
};
