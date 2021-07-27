const sample = require('../controllers/sample.controller.js');
//const sample = require('../models/sample.model.js');

module.exports = (app) => {
    app.post('/sample', sample.create);
    app.get('/sample', sample.findAll);
    app.get('/sample/:id', sample.findOne);
    app.put('/sample/:id', sample.update);
    app.delete('/sample/:id', sample.remove);
};
