import React, { useState } from 'react'
import user from '../assets/user.jpg'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import axios from 'axios';


const CustomerProfile = () => {
    const [orders, setOrders] = useState([]);

    const userData = localStorage.getItem('user');
    const userProfile = JSON.parse(userData);

    const CONFIG_OBJ = {
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    }

    // Get orders of user 
    const LoggedUserOrders = async () => {
        try {

            const response = await axios.get('http://localhost:4000/orderDetails', CONFIG_OBJ);

            if (response.status === 200) {
                setOrders(response.data.data);
            }
        } catch (error) {
            console.log(error)
        }
    }
    useState(() => {
        LoggedUserOrders();
    }, [])
    return (
        <div>
            <div className="container-fluid py-5 bg-gray-300">
                <div className="container bg-white border rounded-lg border-gray-950 shadow-2xl p-2">
                    <h3>Profile</h3>
                    <div className="section-one">
                        <img src={user} alt="user" className='border border-black rounded-full object-cover w-24 h-24' />
                        <div className="user-details">
                            <p className='capitalize'>Name : <span>{userProfile.name}</span></p>
                            <p className=''>UserName : <span>@{userProfile.username}</span></p>
                            <p className=''>E-Mail : <span>{userProfile.email}</span></p>
                            <p className=''>Phone Number : <span>{userProfile.phnumber}</span></p>
                            <p className=''>Address : <span>{userProfile.address}</span></p>
                            {
                                userProfile.isAdmin ? <div>
                                    <button className='btn btn-primary mb-3'><Link className='text-white no-underline' to="/admin">Admin Dashboard</Link></button>
                                </div> : ""
                            }
                        </div>
                        <hr />
                    </div>
                    <div className="order-history">
                        <h2>Order History</h2>
                        <div className="order-items">
                            {
                                orders.map((order) => {
                                    return (
                                        order ?
                                            <div key={order._id} className="cart-item card mb-3">
                                                <div className="row g-0">
                                                    <div className="products-details col-md-9 p-2 border border-r-black">
                                                        {order.image}
                                                        <div className="productnames">
                                                            Products :
                                                            {order.orderItems.map((item) => (
                                                                <span key={item.product._id}>{item.product.pname}, </span>
                                                            ))}
                                                        </div>
                                                        <div className="item-length">
                                                            Total Items : <span>{order.orderItems.length}</span>
                                                        </div>
                                                        <div className="item-length">
                                                            Order Id : <span>{order._id}</span>
                                                        </div>

                                                    </div>

                                                    <div className="order-status col-md-3 p-2 flex flex-col gap-2">
                                                        <span className=''> Status : <span>{order.orderStatus}</span></span>
                                                        <button className='btn btn-danger'>
                                                            Cancel Order
                                                        </button>
                                                    </div>
                                                </div>
                                            </div> : ''
                                    )
                                })

                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerProfile
