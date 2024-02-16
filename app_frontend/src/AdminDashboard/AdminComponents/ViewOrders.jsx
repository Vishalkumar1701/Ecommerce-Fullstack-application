import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const ViewOrders = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");

  const CONFIG_OBJ = {
    headers: {
      "Content-type": 'application/json',
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }

  const viewAllOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4000/allOrders', CONFIG_OBJ);
      if (response.status === 200) {
        setOrderDetails(response.data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    viewAllOrders();
  }, [])

  const deleteOrder = async (orderId) => {
    debugger
    try {
      const response = await axios.delete(`http://localhost:4000/deleteOrder/${orderId}`, CONFIG_OBJ);
      if (response.status === 200) {
        toast.success('Order Discarded')
        viewAllOrders();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='p-3'>
      <table className='table table-striped w-full '>
        <thead>
          <tr className='text-center'>
            <td className='font-bold'>
              Order Details
            </td>
            <td className='font-bold'>
              Order Status
            </td>
            <td className='font-bold'>
              Edit
            </td>
          </tr>
        </thead>
        <tbody>
          {
            orderDetails.map((order) => {
              return (
                <tr key={order._id} className=''>
                  <td className=''>
                    <div className="orderedBy flex flex-col">
                      <span>Ordered By : <span className='capitalize'>{order.user.name}</span></span>
                      <span>Order Id : #<span>{order._id}</span></span>
                      <span>Total Items Ordered : <span>{order.orderItems.length}</span></span>
                    </div>
                  </td>
                  <td className='text-center'>
                    <span>{order.orderStatus}</span>
                  </td>
                  <td className='text-center'>
                    <button className='btn btn-primary mr-2'>
                      <Link to={`/admin/viewOrders/edit/${order._id}`} className='no-underline text-white'> Order Status </Link>
                    </button>

                    <button className='btn btn-danger' onClick={()=> deleteOrder(order._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })
          }

        </tbody>
      </table>
      <ToastContainer/>
    </div>
  )
}

export default ViewOrders
