const express = require('express');
const mongoose = require('mongoose');
const customerModel = mongoose.model('customerModel');
const productModel = mongoose.model('productModel');

const router = express.Router();

router.get('/seedUsers',async(req,res)=>{
    try{
        //Admin user
        const user1 = new customerModel({
            name : 'Johnny Doe',
            phnumber : 3456721976,
            email : 'Jhonnydoe@gamil.com',
            username : 'jhonny',
            password: 'jhonny1234',
            address: 'Kolkata',
            isAdmin: false,
        })
        await user1.save();

        //Normal Customer
        const user2 = new customerModel({
            name : 'Vishal Kumar',
            phnumber : 45678932413,
            email : 'vishal@gmail.com',
            username : 'vishal12',
            password : 'vishal1234',
            address : 'West Bengal',
            isAdmin : true,
        })
        await user2.save();
        res.json({message : 'Users seeded successfully'});
    }catch(error){
        console.log(error);
        return res.status(500).json({error : "Some error occured"});
    }
})

//Router to seed Products
router.get('/seedProducts', async(req,res)=>{
    try{
        const products = [
            {
                pname : 'Product 1',
                price : 200,
                quantity : 4,
                category: "Men",
                Image : "product1.jpeg"
            },{
                pname : 'Product 2',
                price : 400,
                quantity : 2,
                category: "Men",
                Image : "product2.jpeg"
            },{
                pname : 'Product 3',
                price : 600,
                quantity : 1,
                category: "Men",
                Image : "product3.jpeg"
            },{
                pname : 'Product 4',
                price : 900,
                quantity :5,
                category: "Men",
                Image : "product4.jpeg"
            },{
                pname : 'Product 5',
                price : 1000,
                quantity : 3,
                category: "Men",
                Image : "product5.jpeg"
            },
        ];

        await productModel.insertMany(products);
        res.json({success : "Products seeded successfully"});
        
    }catch(error){
        console.log(error);
        return res.status(500).json({error : "Some error occured"});
    }
})

module.exports = router;