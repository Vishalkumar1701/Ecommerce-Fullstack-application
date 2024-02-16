import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NewOrder = () => {

    const navigate = useNavigate();

    const getshippingInfo = localStorage.getItem('shippingInfo');
    const shippingInfo = JSON.parse(getshippingInfo);

    const userDetails = localStorage.getItem('user');
    const user = JSON.parse(userDetails);

    const getcartItems = localStorage.getItem('cartItems');
    const cartItems = JSON.parse(getcartItems);

    const subTotal = cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0)
    let shippingPrice = 0;
    if (subTotal >= 100 && subTotal <= 1500) {
        shippingPrice = 0;
    } else if (subTotal >= 1501 && subTotal <= 2500) {
        shippingPrice = 85;
    } else if (subTotal >= 2501 && subTotal <= 4500) {
        shippingPrice = 110;
    } else if (subTotal >= 4501) {
        shippingPrice = 120;
    }

    const totalPrice = subTotal + shippingPrice;

    const proceedToPayment = ()=>{
        const data = {
            subTotal, shippingPrice, totalPrice
        };
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate('/orderPayment');
    }

    return (
        <div className="container-fluid bg-gray-300 p-2">
            <div className='container'>

                {/* Show ordered Items */}
                <div className="orderItems bg-white rounded-lg p-2 my-1">
                    <h4>Items in Cart</h4>
                    {
                        cartItems && cartItems.map((items) => (
                            <div key={items.product} className='flex items-center mb-3 gap-2'>
                                <div><img className='w-20' src={items.image} alt="" /></div>
                                <span>{items.pname} - ₹{items.price} - qty {items.quantity}</span>
                            </div>
                        ))
                    }
                    <hr />
                    <div className="totalPrice flex justify-around items-center">
                        <div className='font-bold'>Subtotal Price : <span>₹{subTotal}</span></div>
                        <div className="subtotal font-bold">Shipping Price : <span>₹{shippingPrice}</span></div>
                        <div className="shipping font-bold">Total Price : <span>₹ {totalPrice}</span></div>

                        <Link to='/allproducts'><button className='btn btn-success'>Shop More</button></Link>
                    </div>
                </div>

                {/* show shipping info */}
                <div className="shippingInfo bg-white rounded-lg p-2 mb-1">
                    <h4>Shipping Details</h4>
                    {
                        shippingInfo ?
                            <>
                                <div>Address : <span>{shippingInfo.address}</span></div>
                                <div>Phone Number : <span>{shippingInfo.phNumber}</span></div>
                                <div>Pincode : <span>{shippingInfo.pincode}</span></div>
                                <div>City : <span>{shippingInfo.city}</span></div>
                                <div>State : <span>{shippingInfo.state}</span></div>
                                <div>Country : <span>{shippingInfo.country}</span></div>

                            </> : ''
                    }
                </div>

                {/* show user details */}
                <div className="userDetails bg-white rounded-lg p-2 mb-1">
                    <h4>User Details</h4>
                    {
                        user ?
                            <>
                                <div>Name : <span>{user.name}</span></div>
                                <div>Email : <span>{user.email}</span></div>
                                <div>Username : <span>{user.username}</span></div>
                            </> : ''
                    }
                </div>                

                <div className="paymentOrder ">
                    <button className='btn btn-primary w-full mt-3'>  <span className='text-xl font-bold' onClick={proceedToPayment}>Procced to Payment</span> </button>
                </div>
            </div>


        </div>
    )
}

export default NewOrder
