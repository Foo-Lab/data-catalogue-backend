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
require('./routes/users.routes.js')(app);
require('./routes/statuses.routes.js')(app);
require('./routes/organisms.routes.js')(app);
require('./routes/sequencing_types.routes.js')(app);
require('./routes/sequences.routes.js')(app);
require('./routes/sequencing_providers.routes.js')(app);
require('./routes/file_types.routes.js')(app);
require('./routes/sample_files.routes.js')(app);
require('./routes/experiments.routes.js')(app);
require('./routes/samples.routes.js')(app);


const port = process.env.PORT || 5000;
app.listen(port, () =>
    console.log(`Server listening at port ${port}...`)
);
