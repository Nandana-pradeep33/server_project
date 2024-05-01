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

app.post("/check-email", async (req, res) => {
  const { email } = req.body;
  try {
    const existingStudent = await StudentModel.findOne({ email: email });
    if (existingStudent) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post('/register', async (req, res) => {
  try {
    const existingStudent = await StudentModel.findOne({ email: req.body.email });
    if (existingStudent) {
      return res.status(400).json({ error: 'Email address is already registered' });
    }

    const newStudent = await StudentModel.create(req.body);
    res.json({ message: 'Registration successful', student: newStudent });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.listen(3001, () => {
    console.log("server is running")
})
