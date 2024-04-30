const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    contact: Number

})

const StudentModel = mongoose.model("student", StudentSchema)
module.exports = StudentModel
