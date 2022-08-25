const dotenv = require('dotenv');

dotenv.config();

const {PORT, HOST, HOST_URL, SALT, SECRET_KEY, MONGO_URL} = process.env;

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    salt: Number(SALT),
    secretKey: SECRET_KEY,
    mongoUrl: MONGO_URL
}