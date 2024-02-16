const mongoose = require('mongoose');
// const {objectId} = mongoose.Schema.Types;

const productModel = new mongoose.Schema({
    pname : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    rating :{
        type : Number,
    }
},{
    timestamps : true
})

mongoose.model('productModel', productModel);
