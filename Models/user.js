const mongoose = require('mongoose');
require('dotenv').config()

const pass=process.env.PASS
const user=process.env.USER

mongoose.connect(
    `mongodb+srv://${user}:${pass}@cluster0.pbb45.mongodb.net/restapi?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  ).then(()=>{
    console.log("Connected to MongoDB");
  }
  ).catch((err)=>{
    console.log("Error in DB Connection");
  });


const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
        length: [1,3]
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    
    },
    password:{
        type: String,
        required: true,
        minlength: [8, "Password should be atleast 8 characters long"]
    
    },
    mobile:{
        type: Number,
        
        minlength: [10, "Mobile number should be atleast 10 digits long"]
    },
    dob:{
        type: String,
        required: true,
        
    }
})



const User = mongoose.model('User', Schema);

module.exports = User;