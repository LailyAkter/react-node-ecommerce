const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name: {
        type: String,
        trim: true
      },
    slug: { 
        type: String, 
        slug: 'name', 
        unique: true
    },
});

module.exports = Brand = mongoose.model('brand',brandSchema);