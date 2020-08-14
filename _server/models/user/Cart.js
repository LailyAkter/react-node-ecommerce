const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    item:{
            type: Schema.Types.ObjectId,
            ref: 'product'
        },
    quantity:{
        type: Number
    },
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'user'
    // }
});

module.exports = Cart = mongoose.model('cart',cartSchema);