const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const customerModel = mongoose.model('customerModel');

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req,res,next)=>{
    try{
        const {authorization} = req.headers;
        if(!authorization){
            return res.status(401).json({error : "User not found"});
        }
        const token = authorization.replace("Bearer ","")
        jwt.verify(token, JWT_SECRET, async(error,payload)=>{
            if(error){
                return res.status(401).json({error : "User not found"});
            }

            const {_id} = payload;
            const userDb = await customerModel.findById(_id);
            if(!userDb){
                return res.status(401).json({error : "User not found"});
            }
            req.user = userDb;
            if(!userDb.isAdmin) {
                return res.status(403).json({error : "User not authorized"})
            }
            next();
        })
    }catch(error){
        return res.status(500).json({error : 'Some error occured'})
    }
}
