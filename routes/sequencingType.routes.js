const sequencingType = require('../controllers/sequencingType.controller');

module.exports = (app) => {
    app.post('/sequencingType', sequencingType.create);
    app.get('/sequencingType', sequencingType.findAll);
    app.get('/sequencingType/:id', sequencingType.findOne);
    app.put('/sequencingType/:id', sequencingType.update);
    app.delete('/sequencingType/:id', sequencingType.remove);
};
