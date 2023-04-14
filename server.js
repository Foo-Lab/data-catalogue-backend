const express = require('express');
const cors = require('cors');
const { AppError } = require('./utils');
require('dotenv').config();
require('./config/database');
const cookieParser = require('cookie-parser');
const verifyAccessToken = require('./utils/verifyAccessToken');

const app = express();
app.use(cors({
    origin: `http://${process.env.FRONTEND_URL}`,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware for parsing cookies
app.use(cookieParser());

// public routes
app.get('/', (req, res) => res.send('test'));
require('./routes/auth.routes')(app);
require('./routes/refresh.routes')(app);

app.use(verifyAccessToken);

// routes protected by auth token
require('./routes/user.routes')(app);
require('./routes/status.routes')(app);
require('./routes/organism.routes')(app);
require('./routes/sequencingType.routes')(app);
require('./routes/sequencer.routes')(app);
require('./routes/sequencingProvider.routes')(app);
require('./routes/fileType.routes')(app);
require('./routes/sampleFile.routes')(app);
require('./routes/experiment.routes')(app);
require('./routes/sample.routes')(app);

app.all('*', (req, res, next) => {
    next(new AppError(`Page ${req.originalUrl} not found`, 404));
});

// middleware
app.use((err, req, res, next) => res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    errors: err.errors,
    message: err.message,
    stack: err.stack,
}));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening at port ${port}...`));
