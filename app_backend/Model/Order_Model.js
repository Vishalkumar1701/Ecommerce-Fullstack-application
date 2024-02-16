const mongoose = require('mongoose');

const orderModel = new mongoose.Schema({
    shippingInfo : {
        address : {
            type: String,
            required : true,
        },
        city : {
            type : String,
            required: true,
        },
        state : {
            type : String,
            required : true,
        },
        country : {
            type : String,
            required : true,
        },
        pincode : {
            type : String,
            required : true,
        },
        phNumber : {
            type : String,
            required :true,
        }
    },
    orderItems : [
        {
            product : {
                type : mongoose.Schema.ObjectId,
                ref : 'productModel',
                required : true,
            }
        }
    ],
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'customerModel',
        required : true,
    },
    paymentInfo : {
        id: {
            type: String,
            required: true,
        },
        status : {
            type : String,
            required : true,
        },
        shippingPrice : {
            type: Number,
            required : true,
            default : 0
        },
        itemPrice: {
            type : Number,
            required : true,
            default: 0
        },
        paidAt : {
            type : Date,
            // required: true,
        },        
    },
    orderStatus : {
        type : String,
        required : true,
        default : "Processing"
    },
    deliveredAt : {
        type : Date
    }
},{
    timestamps : true
});

mongoose.model('orderModel', orderModel);