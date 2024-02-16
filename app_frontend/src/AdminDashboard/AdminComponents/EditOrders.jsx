import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';


const EditOrders = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState('');
  const [orderStatus, setOrderStatus] = useState('');

  const CONFIG_OBJ = {
    headers: {
      "Content-type": 'application/json',
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }

  //Get Single Order Details
  const getSingleOrderDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/orderDetails/${orderId}`, CONFIG_OBJ);
      if (response.status === 200) {
        setOrderData(response.data.orderData)
      }
    } catch (error) {
      console.log(error.response)
    }
  }
  useEffect(() => {
    if (orderId) {
      getSingleOrderDetails()
    }

  }, [orderId])

  
  return (
    <div>
      <div className="container">
        <div className="shippingDetails bg-gray-100 my-2 p-4 rounded-lg">
          <h4>Shipping Info</h4>
          {orderData && orderData.shippingInfo && (
            <div className="shipping-details flex flex-col">
              <span>Address: <span>{orderData.shippingInfo.address}</span></span>
              <span>City: <span>{orderData.shippingInfo.city}</span></span>
              <span>State: <span>{orderData.shippingInfo.state}</span></span>
              <span>Country: <span>{orderData.shippingInfo.country}</span></span>
              <span>Pincode: <span>{orderData.shippingInfo.pincode}</span></span>
              <span>Phone Number: <span>{orderData.shippingInfo.phNumber}</span></span>
            </div>
          )}
        </div>
        <div className="orderStatus bg-gray-100 my-2 p-4 rounded-lg">
          <div className="os flex flex-col">
            <span className=''>Order Status : <span>{orderData.orderStatus}</span></span>
            <form action="">
              <select className="form-select mt-3" aria-label="Default select example">
                <option defaultValue>Update Order Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>                
                <option value="Delivered">Delivered</option>
              </select>
              <button type='submit' className='btn btn-primary mt-2'>Save Order Status</button>
            </form>
          </div>
        </div>
        <div className="paymentInfo bg-gray-100 my-2 p-4 rounded-lg">
          <h4>Payment Info</h4>
          <div className="pd flex flex-col">
            {orderData.paymentInfo ? (
              <>
                <span>Payment Id : <span>{orderData.paymentInfo.id}</span></span>
                <span>Status : <span>{orderData.paymentInfo.status === 'succeeded' ? 'Paid' : 'Cash on Delivery'}</span></span>
                <span>Paid on : <span>{orderData.createdAt}</span></span>
              </>
            ) : (
              <span>No payment information available</span>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default EditOrders
