const crypto = require('crypto');

const generateSalt = () => crypto.randomBytes(16).toString('hex');

const hashPassword = ((password, salt) => crypto.pbkdf2Sync(
    password,
    salt,
    1000,
    64,
    'sha512',
).toString('hex'));

module.exports = {
    generateSalt,
    hashPassword,
};
