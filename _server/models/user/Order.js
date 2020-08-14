const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: { 
        type:Schema.Types.ObjectId,
        ref: 'user' 
        },
    order: [
        {
            product: { 
                type:Schema.Types.ObjectId, 
                ref: 'product' 
            },
            price: { 
                type: Number, 
                required: true
            },
            quantity: Number
        }
    ],
    address: [
        {
            fullName: { 
                type: String,
                required: true
             },
            mobileNumber: { 
                type: Number,
                required: true 
            },
            pinCode: { 
                type: Number, 
                required: true
            },
            locality: { 
                type: String, 
                required: true 
            },
            address: { 
                type: String, 
                required: true 
            },
            cityDistrictTown: { 
                type: String, 
                required: true 
            },
            state: { 
                type: String, 
                required: true 
            },
            landmark: String,
            alternatePhoneNumber: Number
        }
    ],
    orderDate: { 
        type: Date, 
        default: Date.now()
     },
    paymentType: String,
    paymentStatus: String,
    isOrderCompleted: { 
        type: Boolean,
        default: false
    }
});

module.exports = Order = mongoose.model('order',orderSchema);