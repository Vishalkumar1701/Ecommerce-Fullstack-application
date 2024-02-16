const express = require('express');
const mongoose = require('mongoose');
const customerModel = mongoose.model('customerModel');
const productModel = mongoose.model('productModel');
const bcrypt = require('bcrypt');
const adminUser = require('../Middleware/Adminuser');
const LoggedInuser = require('../Middleware/LoggedInuser');
const router = express.Router();


//Add users
router.post('/addusers', adminUser, async (req, res) => {
    try {
        const { name, email, password, phnumber, address, username, isAdmin } = req.body;
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

        res.status(201).json({ success: 'User registered successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Some error occured' })
    }
})

//Get all users
router.get('/allUsers', adminUser, async (req, res) => {
    try {
        const allUsers = await customerModel.find()
            .sort({ createdAt: -1 })
            .populate({
                path: 'name phnumber email username password address isAdmin'
            }).exec();
        res.status(200).json({ users: allUsers });
    } catch (error) {
        return res.status(500).json({ error: "Some error occured" })
    }
})

//Get single user details
router.get('/userDetails/:id', adminUser, async(req,res)=>{
    try {
        const userId = req.params.id;
        
        const user = await customerModel.findById(userId).select('-password');
        if(!user){
            return res.status(404).json({error : 'User not found'});
        }
        res.status(200).json({user : user})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error : 'Some error occured'})
    }
})

//Edit a user
router.put('/editUser/:id', adminUser, async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, phnumber, email, username, password, address, isAdmin } = req.body;

        const user = await customerModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (name) {
            user.name = name;
        }
        if (phnumber) {
            user.phnumber = phnumber;
        }
        if (email) {
            user.email = email;
        }
        if (username) {
            user.username = username;
        }
        if (password) {
            user.password = password;
        }
        if (address) {
            user.address = address;
        }
        if (isAdmin !==undefined ) {
            user.isAdmin = isAdmin;
        }
        await user.save();
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Some error occured' })
    }
})

//Delete a user
router.delete('/deletUser/:id', adminUser, async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await customerModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error : 'user not found'});
        }
        await customerModel.deleteOne({ _id: userId });
        res.status(200).json({ success: 'User deleted!' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({error : 'Some error occured'});
    }
})

// ------------------------------------------------------------------------- 

//Get Single Product
router.get('/product/:id', LoggedInuser, async(req,res)=>{
    try{
        const productId = req.params.id;
        const product = await productModel.findById(productId);
        if(!product){
            return res.status(404).json({error : 'Product unavilable'});
        }
        res.status(200).json({product : product});
    }catch(error){
        return res.status(500).json({error : 'Some error occured'});
    }    
})

//Add Products
router.post('/addProduct', adminUser, async (req, res) => {
    try {
        const { pname, price, category, desc, image } = req.body;
        const product = new productModel({
            pname,
            price,
            desc,
            category,
            image
        })
        await product.save();
        res.status(200).json({ success: "Product added!" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Some error occured" });
    }
})

//edit product by Id
router.put('/editProduct/:id', adminUser, async (req, res) => {
    try {
        const productId = req.params.id;
        const { pname, price, desc, category, image } = req.body;

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" })
        }
        //to update product details
        if (pname) {
            product.pname = pname;
        }
        if (price) {
            product.price = price;
        }
        if (desc) {
            product.desc = desc;
        }
        if (category) {
            product.category = category;
        }
        if (image) {
            product.image = image;
        }
        await product.save();
        res.status(200).json({ success: product });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Some error occured" })
    }
})

//Delete a product by Id
router.delete('/deleteProduct/:id', adminUser, async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        await productModel.deleteOne({ _id: productId });
        return res.status(201).json({ success: "Product deleted succesfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Some error occured" });
    }
})




module.exports = router;