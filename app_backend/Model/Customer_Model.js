const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const customerModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phnumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

mongoose.model("customerModel", customerModel);
