const organism = require('../controllers/organism.controller');

module.exports = (app) => {
    app.post('/organism', organism.create);
    app.get('/organism', organism.findAll);
    app.get('/organism/:id', organism.findOne);
    app.put('/organism/:id', organism.update);
    app.delete('/organism/:id', organism.remove);
};
