const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
    type: String,
    department: String,
    departmentId: String
})

const departmentDB = module.exports = mongoose.model('department', departmentSchema);
