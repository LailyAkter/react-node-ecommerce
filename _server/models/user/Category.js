const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema ({
    name:{
        type:String
    },
    slug:{
        type:String
    },
    description:{
        type:String
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

module.exports = Category = mongoose.model('category',categorySchema);