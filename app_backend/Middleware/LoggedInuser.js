const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const customerModel = mongoose.model('customerModel');

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "User not found" });
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, async(error, payload) => {
        if (error) {
            return res.status(401).json({ error: "User not found" });
        }
        const { _id } = payload;
        try {
            const dbuser = await customerModel.findById(_id);

            if (!dbuser) {
                return res.status(401).json({ error: "User not found" });
            }

            req.user = dbuser;
            next();
        } catch (err) {
            // Handle database query error
            console.error("Error querying database:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    })
}