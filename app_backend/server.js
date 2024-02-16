if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


const app = express();
const mongodb_url = process.env.MONGODB_URL;
const port = process.env.PORT;

mongoose.connect(mongodb_url);
mongoose.connection.on('connected', ()=>{
    console.log('Database Connected')
})
mongoose.connection.on('error', (error)=>{
    console.log(error);
    console.log('Error while connecting to database');
})
app.use(cors());
app.use(express.json());

//Models 
require('./Model/Customer_Model');
require('./Model/Order_Model');
require('./Model/Product_Model');

//Routes
app.use(require('./Routes/paymentStripeRoute'));
app.use(require('./Routes/userRoute'));
app.use(require('./Routes/adminRoute'));
app.use(require('./Routes/orderRoute'));

app.use(express.static(path.join(__dirname,"../app_frontend/dist")))

app.get("*", (req,res)=> {
    res.sendFile(path.resolve(__dirname, "../app_frontend/dist/index.html"));
})
app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})
