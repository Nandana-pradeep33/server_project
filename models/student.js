const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: {
        type: String,
        required: true,
        minlength: 60, // Assuming the hashed password length is 60 characters
      },
    contact: Number,
    year: String,
    branch: String,
    skills: [String] ,
    rating: [Number] ,
    dates: [Date],

    accept:Boolean,
    email2:[String],
    dates2:[Date],

})

const StudentModel = mongoose.model("student", StudentSchema)
module.exports = StudentModel
