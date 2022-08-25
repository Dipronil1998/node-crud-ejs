const mongoose = require('mongoose');
const config = require("./boostrap");

module.exports = () => {
    mongoose.connect(config.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() =>
            console.log('MongoDb connected successfuly...')
        ).catch((err) =>
            console.log("Connection error")
    );
}