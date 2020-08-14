const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    category: { 
        type: Schema.Types.ObjectId, 
        ref: 'category' 
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'brand'
    },
    tag: {
        type: Schema.Types.ObjectId,
        ref: 'tag'
    },
    name:{
        type:String,
        trim:true,
    },
    sku:{
        type:String
    },
    slug:{
        type:String,
        unique:true
    },
    image:{
        data:Buffer,
        contentType:String
    },
    description:{
        type:String,
        trim:true
    },
    quantity:{
        type:Number
    },
    price:{
        type:String
    },
    shipping: {
      required: true,
      type: Boolean
    },
    available: {
      required: true,
      type: Boolean
    },
    stock: { 
        type: Number, 
        required: true
     },
    offer: { 
        type: Number, 
        default: 0
    },
    reviews: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            review: String,
            createdAt: Date
        }
    ],
    keyword: {
        type: String
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

module.exports = Product = mongoose.model('product',productSchema);