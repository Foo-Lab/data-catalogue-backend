class SequelizeError extends Error {
    constructor(error) {
        super(error.message);

        this.statusCode = 422;
        this.status = 'error';
        this.errors = error.errors;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = SequelizeError;
