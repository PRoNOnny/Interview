const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mangoURL');
mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true
        })

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB

module.exports.addNewData = async (data, callback) => {
    data.save().then((result) => {
        callback(result);
    }).catch((err) => {
        callback('false')
    })
}