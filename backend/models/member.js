const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    no: String,
    name: String,
    surname: String,
    branchId: String,
    departmentId: String
})

const memberDB = module.exports = mongoose.model('member', memberSchema);

