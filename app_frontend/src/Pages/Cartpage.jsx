import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import {addItemsToCart, removeItemsFromCart} from "../Actions/CartActions";
import { useNavigate } from 'react-router-dom';
const Cartpage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cartItems} = useSelector((state) => state.cart);
    
    const increaseQuantity = (id, quantity) => {
        const newQty = quantity + 1;
        dispatch(addItemsToCart(id,newQty));
    }

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if(1 >= quantity){
            return;
        }
        dispatch(addItemsToCart(id,newQty));
    }

    const deleteCartItem = (id) => {
        dispatch(removeItemsFromCart(id));
    };

    const checkoutHandler = () => {
        navigate('/checkout')
    }

    return (
        <div className='container-fluid bg-gray-300 min-h-screen'>
            <div className="container h-screen">
                <h2 className='bg-gray-700 text-white py-2 px-3 rounded-xl'>Your Cart</h2>

                {
                    cartItems && cartItems.map((item) => (
                        <div key={item.product} className="cart-item card mb-3">
                            <div className="row g-0">
                                <div className="col-md-2">
                                    <img src={item.image} className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-9">
                                    <div className="card-body flex flex-col">
                                        <p className="card-title font-bold">{item.pname}</p>
                                        <span>Price : <span>₹ {item.price}</span></span>
                                        <span>Item Subtotal : <span>₹ {item.price * item.quantity}</span></span>
                                    </div>
                                    <div className="buttons flex justify-between mb-2">
                                        <div className="cartoperation flex items-center">
                                            <button type='' className='btn' onClick={() => increaseQuantity(item.product, item.quantity)}><FontAwesomeIcon className='plus' icon={faPlus} /></button>
                                            <div className="diplayitemnumber border border-gray-800 px-4 py-1 rounded-lg mx-2">{item.quantity}</div>
                                            <button type='' className='btn' onClick={() => decreaseQuantity(item.product, item.quantity)}><FontAwesomeIcon className='minus' icon={faMinus} /></button>
                                        </div>
                                        <button type='' className='btn btn-danger mr-4' onClick={() => deleteCartItem(item.product)}><FontAwesomeIcon className='del' icon={faTrash} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }


                <div className="bg-white container px-5 py-2  w-full rounded-lg flex items-center justify-around lg:flex-row md:flex-col sm:flex-col">
                    <div className="price-content text-center">
                        <span className='font-bold'>Subtotal : <span>{`₹ ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}</span></span>
                    </div>
                    <div className="checkout text-center">
                        <button className=' btn btn-success' onClick={checkoutHandler}> Checkout </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cartpage
