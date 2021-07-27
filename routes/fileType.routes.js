const fileType = require('../controllers/fileType.controller.js');
//const fileType = require('../models/fileType.model.js');

module.exports = (app) => {
    app.post('/fileType', fileType.create);
    app.get('/fileType', fileType.findAll);
    app.get('/fileType/:id', fileType.findOne);
    app.put('/fileType/:id', fileType.update);
    app.delete('/fileType/:id', fileType.remove);
};
