const mongoose = require('mongoose');
const validator = require("email-validator");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'name is required'],
        minLength:3,
        maxLength:10,
        trim:true
    },

    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (value) => validator.validate(value), 
      message: "Please enter a valid email address",
    },
  },

  password:{
    type:String,
    required:[true,'Password is required'],
    minLength:[6,'password must be atleast 6 characters']
  },

  avatarUrl:{
    type:String,
  },

  bio:{
    type:String,
    maxLength:100,
  },
}, {
    timestamps:true
});

module.exports = mongoose.model("User", userSchema);