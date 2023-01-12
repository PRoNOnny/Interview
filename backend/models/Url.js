const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    longUrl: String,
    shortUrl: String,
    date: { type: String, default: Date.now }
})

const urlDB = module.exports = mongoose.model('Url', urlSchema);

module.exports.findId = (id) => {
    urlDB.find({ shortUrl: id }).then((result) => {
        if (result.length == 0) {
            return false
        } else {
            return true
        }
    })
}

module.exports.findlongUrl = (url,callback) => {
    urlDB.find({ longUrl: url }).then((result) => {
        callback(result)
    })
}