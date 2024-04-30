const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const StudentModel = require('./models/student')
const app = express()
const axios = require('axios');
app.use(express.json())
app.use(cors())


mongoose.connect("mongodb+srv://nehaanil753:pOLAqsKIov7T7a2U@cluster0.k8l9hzx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.post("/login",(req,res) => {
  const {email,password}= req.body;
  StudentModel.findOne({email: email})
  .then(user =>{
    if(user){
      if(user.password === password){
        res.json("Success")
      }
    else{
      res.json("the password is incorrect")
    }
    }else{
      res.json("no record existed")
    }

  })
})



app.post('/register',(req,res) => {
   StudentModel.create(req.body)
   .then(student => res.json(student))
   .catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("server is running")
})
