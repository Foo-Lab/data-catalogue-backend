const sample = require('../controllers/sample.controller');

module.exports = (app) => {
    app.post('/sample', sample.create);
    app.get('/sample', sample.findAll);
    app.get('/sample/:id', sample.findOne);
    app.put('/sample/:id', sample.update);
    app.delete('/sample/:id', sample.remove);
};
