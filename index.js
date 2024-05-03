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

app.get('/usersBySkill/:skill', async (req, res) => {
  const { skill } = req.params;
  try {
    const users = await StudentModel.find({ skills: { $in: [new RegExp(skill, 'i')] } });
    res.json(users);
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/updateRating/:userId', async (req, res) => {
  const { userId } = req.params;
  const { rating } = req.body;
  try {
    // Update the user's rating in the database
    await StudentModel.findByIdAndUpdate(userId, { rating: rating });
    res.json({ message: 'Rating updated successfully' });
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get("/userDetails/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const userDetails = await StudentModel.findOne({ email });
    if (userDetails) {
      /* const totalRatings = userDetails.ratings.length;
      const averageRating = totalRatings > 0 ? userDetails.ratings.reduce((acc, val) => acc + val, 0) / totalRatings : 0;
      const ratingDistribution = Array.from({ length: 5 }, (_, i) => userDetails.ratings.filter(rating => rating === i + 1).length);*/

      res.json({ userDetails });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


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

app.put('/updateUser', async (req, res) => {
  try {
    const { email, year, branch, skills } = req.body;
    const updatedUser = await StudentModel.findOneAndUpdate({ email }, { year, branch, skills }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User data updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





app.listen(3001, () => {
    console.log("server is running")
})
