const sampleFile = require('../controllers/sampleFile.controller');

module.exports = (app) => {
    app.post('/sampleFile', sampleFile.create);
    app.get('/sampleFile', sampleFile.findAll);
    app.get('/sampleFile/:id', sampleFile.findOne);
    app.put('/sampleFile/:id', sampleFile.update);
    app.delete('/sampleFile/:id', sampleFile.remove);
};
