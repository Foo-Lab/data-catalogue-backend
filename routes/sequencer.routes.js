const sequencer = require('../controllers/sequencer.controller.js');
//const sequencer = require('../models/sequencer.model.js');

module.exports = (app) => {
    app.post('/sequencer', sequencer.create);
    app.get('/sequencer', sequencer.findAll);
    app.get('/sequencer/:id', sequencer.findOne);
    app.put('/sequencer/:id', sequencer.update);
    app.delete('/sequencer/:id', sequencer.remove);
};
