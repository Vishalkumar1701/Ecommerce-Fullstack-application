import React, { useRef } from 'react'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faKey } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import { Link } from 'react-router-dom';

const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const getshippingInfo = localStorage.getItem('shippingInfo');
    const shippingInfo = JSON.parse(getshippingInfo);

    const userDetails = localStorage.getItem('user');
    const user = JSON.parse(userDetails);

    const getcartItems = localStorage.getItem('cartItems');
    const cartItems = JSON.parse(getcartItems);
    const CONFIG_OBJ = {
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice),
        description: 'Order Payment',
    }
    const order = {
        shippingInfo : shippingInfo,
        orderItems : cartItems,
        user : user,
    }

    const createNewOrder = async()=>{
        const req_body = {
            ...order, 
            orderStatus: 'pending'
        }
        try {
            const response = await axios.post('http://localhost:4000/newOrder', req_body, CONFIG_OBJ);
            if(response.status === 201){
                toast.success('Processing Your order for delivery. Enjoy Shopping !')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        payBtn.current.disabled = true;
        try {
            const CONFIG_OBJ = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }
            const {data} = await axios.post('http://localhost:4000/payment/process',
            paymentData,
            CONFIG_OBJ
            );
            const client_secret = data.client_secret;
            if(!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret,{
                payment_method:{
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address:{
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code : shippingInfo.pincode,
                            country : shippingInfo.country,
                        },
                        phone : shippingInfo.phNumber,

                    }

                }
            })
            if(result.error){
                payBtn.current.disabled = false;
            } else{
                if(result.paymentIntent.status === "succeeded"){
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    }
                    createNewOrder();
                    toast.success('Order Placed');
                    payBtn.current.disabled = true;
                    
                } else {
                    toast.error("Some issue occured while processing payment")
                }
            }

        } catch (error) {
            payBtn.current.disabled = false;
            toast.error('Try again later');
        }
    }
    return (
        <div className='container-fluid min-h-screen bg-gray-300'>
            <div className="paymentContainer container flex justify-center py-10">
                <form action="" onSubmit={(e) => submitHandler(e)} className='bg-white w-97 rounded-lg p-3'>
                    <h4 className='text-center mb-3'>Card Info</h4>
                    <div className='mb-3 w-full border border-black px-2 py-3 rounded-lg'>
                        <FontAwesomeIcon icon={faCreditCard} className='mb-2' />
                        <CardNumberElement className='paymentInput' />
                    </div>
                    <div className='mb-3 w-full border border-black px-2 py-3 rounded-lg'>
                        <FontAwesomeIcon icon={faCalendar} className='mb-2' />
                        <CardExpiryElement className='paymentInput' />
                    </div>
                    <div className='mb-3 w-full border border-black px-2 py-3 rounded-lg'>
                        <FontAwesomeIcon icon={faKey} className='mb-2' />
                        <CardCvcElement className='paymentInput' />
                    </div>
                    <input type="submit" value={`Pay  ₹${orderInfo && orderInfo.totalPrice}`} ref={payBtn} className='paymentFormBtn bg-orange-600 px-3 py-2 rounded-lg w-full text-white font-bold hover:bg-orange-700 transition-colors' />
                </form>
            </div>
            <div className="backbtn text-center">
                <Link to='/allproducts'><button className='btn btn-primary'>Go Back to Store</button></Link>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Payment
