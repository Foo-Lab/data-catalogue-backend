const experiment = require('../controllers/experiment.controller.js');
//const experiment = require('../models/experiment.model.js');

module.exports = (app) => {
    app.post('/experiment', experiment.create);
    app.get('/experiment', experiment.findAll);
    app.get('/experiment/:id', experiment.findOne);
    app.put('/experiment/:id', experiment.update);
    app.delete('/experiment/:id', experiment.remove);
};
