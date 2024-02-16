const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const LoggedInuser = require('../Middleware/LoggedInuser');

router.post('/payment/process',LoggedInuser, async(req,res)=> {
    const myPayment = await stripe.paymentIntents.create({
        amount : req.body.amount,
        currency : 'inr',
        description : 'Order Payment',
        metadata: {
            company : "Ecommerce",
        },
    });
    res.status(200).json({success : true, client_secret: myPayment.client_secret, myPayment});
});

router.get('/stripeapikey',LoggedInuser, async(req,res) => {
    res.status(200).json({stripeApiKey : process.env.STRIPE_API_KEY})
});


module.exports = router;