const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = Schema({
  name:{
    type:String
  },
  email:{
    type:String,
    unique:true,
    required:true
  },
  password:{
    type:String,
    required:true
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

module.exports = Admin = mongoose.model('admin',adminSchema);
