const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/database');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => res.send('test'));
require('./routes/user.routes.js')(app);
require('./routes/status.routes.js')(app);
require('./routes/organism.routes.js')(app);
require('./routes/sequencingType.routes.js')(app);
require('./routes/sequencer.routes.js')(app);
require('./routes/sequencingProvider.routes.js')(app);
require('./routes/fileType.routes.js')(app);
require('./routes/sampleFile.routes.js')(app);
require('./routes/experiment.routes.js')(app);
require('./routes/sample.routes.js')(app);


const port = process.env.PORT || 5000;
app.listen(port, () =>
    console.log(`Server listening at port ${port}...`)
);
