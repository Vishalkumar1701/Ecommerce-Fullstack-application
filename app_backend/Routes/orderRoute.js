const router = require('express').Router();
const mongoose = require('mongoose');
const orderModel = mongoose.model('orderModel');
const customerModel = mongoose.model('customerModel');
const productModel = mongoose.model('productModel');
const adminUser = require('../Middleware/Adminuser');
const LoggedInuser = require('../Middleware/LoggedInuser');

//Create new order
router.post('/newOrder', LoggedInuser, async (req, res) => {
    try {
        const { shippingInfo, orderItems, user, paymentInfo, orderStatus, deliveredAt } = req.body;

        const newOrder = new orderModel({
            shippingInfo,
            orderItems,
            user,
            paymentInfo,
            orderStatus,
            deliveredAt,
        });
        await newOrder.save();
        res.status(200).json({ message: 'Order created successfully', order: newOrder })
    } catch (error) {
        return res.status(500).json({ error: 'Some error occured' });
    }
})

//Get all orders
router.get('/allOrders', adminUser, async (req, res) => {
    try {
        const orders = await orderModel.find().populate('user').populate({ path: 'orderItems.product', model: 'productModel' }).sort({ createdAt: -1 }).exec();
        if (!orders) {
            return res.status(404).json({ error: 'No orders found' })
        }
        res.status(200).json({ success: true, orders });
    } catch (error) {
        return res.status(500).json({ error: 'Some error occured' });
    }
})

//Get Single Order Details
router.get('/orderDetails/:id', LoggedInuser, async (req, res) => {
    try {
        const orderId = req.params.id;

        orderData = await orderModel.findById(orderId);
        if (!orderData) {
            return res.status(404).json({ error: 'no order found' });
        }
        res.status(200).json({success : true, orderData});
    } catch (error) {
        return res.status(500).json({ error: 'Some error occured' });
    }
})

// Get loggedIn user Orders
router.get('/orderDetails', LoggedInuser, async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId);
        const orders = await orderModel.find({ user: userId }).populate({
            path: 'orderItems.product',
            model: 'productModel',
        });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        return res.status(500).json({ error: 'Some error occured' })
    }
})

//Update Order status
router.put('/updateStatus/:id', adminUser, async (req, res) => {
    try {
        const orderId = req.params.id;
        const {orderStatus} = req.body;
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        if (orderStatus) {
            order.orderStatus = orderStatus;
        }
        await order.save();
        res.status(200).json({ success: true, order });
    } catch (error) {
        return res.status(500).json({ error: 'Some error occured' })
    }
})

//Delete Order
router.delete('/deleteOrder/:id', adminUser, async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await orderModel.findById(orderId);
        if(!order) {
            return res.status(404).json({error : 'order not found'});
        }
        await orderModel.deleteOne({_id : orderId});
        res.status(200).json({message : "Order deleted!"});
    } catch (error) {
        return res.status(500).json({ error: 'Some error occured' });
    }
})
module.exports = router;