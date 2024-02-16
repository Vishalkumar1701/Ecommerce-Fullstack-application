const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const loggedInUser = require('../Middleware/LoggedInuser')
const ApiFeatures = require('../Utils/ApiFeatures');

dotenv.config();
const router = express.Router();
const customerModel = mongoose.model('customerModel');
const productModel = mongoose.model('productModel');
const JWT_SECRET = process.env.JWT_SECRET;

//SIGNUP API : 
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, phnumber, address, username ,isAdmin} = req.body;
        if (!name || !email || !password || !phnumber || !address || !username) {
            return res.status(400).json({ error: 'Manditory Fields are empty' });
        }
        const userInDb = await customerModel.findOne({ email });
        if (userInDb) {
            return res.status(500).json({ error: 'User already exists try different email' })
        }

        const hashedPassword = await bcrypt.hash(password, 16);
        const newUser = new customerModel({
            name, 
            email,
            password: hashedPassword,
            phnumber,
            address,
            username,
            isAdmin
        });
        await newUser.save();
        res.status(201).json({success : 'User registered successfully'});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Some error occured' })
    }
})

//Sign in Api :
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Manditory field is empty' })
        }
        const userInDb = await customerModel.findOne({ email });
        if (!userInDb) {
            return res.status(401).json({ error: 'Invalid Credentials' });
        }
        const matchedPassword = await bcrypt.compare(password, userInDb.password);
        if(matchedPassword){
            const jwtToken = jwt.sign({_id: userInDb._id},JWT_SECRET);
            const userInfo = {
                '_id' : userInDb._id,
                'name' : userInDb.name,
                'email' : userInDb.email,
                'username' : userInDb.username,
                'address' : userInDb.address,
                'phnumber' : userInDb.phnumber,
                "isAdmin" : userInDb.isAdmin
            }
            res.status(200).json({result : {
                token : jwtToken,
                user : userInfo,
            }});
        }else{
            return res.status(401).json({error : 'Invalid Credentials'})
        }
    } catch (error) {
        return res.status(500).json({ error: 'Some error occured' })
    }

})

//Get All Products
router.get('/allProducts',loggedInUser, async (req, res) => {
    try {
        const resultPerPage = 8;
        const apiFeatures = new ApiFeatures(productModel.find(),req.query).search().filter().pagination(resultPerPage)
        const allProducts = await apiFeatures.query
            .sort({ createdAt: -1 }).exec();        
        res.status(200).json({ Products: allProducts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Some error occured' })
    }
})



module.exports = router