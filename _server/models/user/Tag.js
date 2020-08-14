const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema ({
    name:{
        type:String
    },
    slug:{
        type:String,
        unique:true
    }
});

module.exports = Tag = mongoose.model('tag',tagSchema);