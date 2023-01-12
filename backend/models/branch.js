const mongoose = require('mongoose')

const branchSchema = new mongoose.Schema({
    branchId: String,
    branch: String,
    departmentId:String
})

const branchDB = module.exports = mongoose.model('branch', branchSchema);
