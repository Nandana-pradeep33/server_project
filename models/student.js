const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    contact: Number,
    year: String,
    branch: String,
    skills: [String] ,
    ratings: Number,

})

const StudentModel = mongoose.model("student", StudentSchema)
module.exports = StudentModel
