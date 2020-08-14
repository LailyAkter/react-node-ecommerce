const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePic:{
    type:String
  },
  phone:{
    type:Number
  },
  created: {
    type: Date,
    default: Date.now()
  },
  updated:{
    type: Date,
    default: Date.now()
  }
});

module.exports = User = mongoose.model("User", UserSchema);
