import React, { useState, Fragment, useEffect } from 'react'
import { Link , useParams} from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { Drawer, Button, Typography, Card, CardBody, CardFooter } from "@material-tailwind/react";
import ViewProducts from './AdminComponents/ViewProducts'
import ViewUsers from './AdminComponents/ViewUsers'
import ViewOrders from './AdminComponents/ViewOrders';
import EditOrders from './AdminComponents/EditOrders';
import EditUserDetails from './AdminComponents/EditUserDetails';
import EditProductDetails from './AdminComponents/EditProductDetails';
import axios from 'axios';


const Admin = () => {

  const CONFIG_OBJ = {
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem('token')
    }
  }

  const {userId} = useParams();
  const [open, setOpen] = useState(false);
  const [showUsers, setShowUsers] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  // const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const toggleDrawer = () => setOpen(!open);

  const getAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/allUsers', CONFIG_OBJ)
      if (response.status === 200) {
        setShowUsers(response.data.users)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllUsers();
  }, [])

  const getAllProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/allProducts', CONFIG_OBJ);
      if (response.status === 200) {
        setAllProducts(response.data.Products)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllProducts();
  })

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

  return (
    <Fragment>
      <div className="topbar bg-gray-700 sticky top-20 p-2 z-50">
        <Button onClick={toggleDrawer} className='p-0 bg-blue-700'>
          <div className="hamburger-menu px-4 py-2">
            View Dashboard &rarr;
          </div>
        </Button>
      </div>
      <div className="content bg-gray-200 flex">
        <Drawer open={open} onClose={closeDrawer} className='backdrop-blur-none py-2 px-3 rounded-lg'>
          <div className="content">
            <Typography variant="h5" color="blue-gray">
              Admin Dashboard
            </Typography>
            <div className="viewUser">
              <Card className="mt-6 border border-gray-700 p-2 bg-red-600 text-white font-semibold">
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    Users
                  </Typography>
                  <hr />
                  <Typography>
                    Total Users : <span>{showUsers.length}</span>
                  </Typography>
                </CardBody>
                <CardFooter className="p-0">
                  <Button className='bg-black p-2' onClick={closeDrawer}><Link to='/admin/viewusers' className='text-white no-underline'>Manage Users</Link></Button>
                </CardFooter>
              </Card>
            </div>
            <div className="viewProducts">
              <Card className="mt-6 border border-gray-700 p-2 bg-green-600 text-white font-semibold">
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    Products
                  </Typography>
                  <hr />
                  <Typography>
                    Total Products registered : <span>{allProducts.length}</span>
                  </Typography>
                </CardBody>
                <CardFooter className="p-0">
                  <Button className='bg-black p-2' onClick={closeDrawer}> <Link to='/admin/viewproducts' className='text-white no-underline'> Manage Products </Link></Button>
                </CardFooter>
              </Card>
            </div>
            <div className="viewOrders">
              <Card className="mt-6 border border-gray-700 p-2 bg-yellow-600 text-white font-semibold">
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    Orders
                  </Typography>
                  <hr />
                  <Typography>
                    Total Orders : <span>{orderDetails.length}</span>
                  </Typography>
                </CardBody>
                <CardFooter className="p-0">
                <Button className='bg-black p-2' onClick={closeDrawer}> <Link to='/admin/vieworders' className='text-white no-underline'> Manage Orders </Link></Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </Drawer>

        <div className="view-screen border-l border-gray-400 px-3 w-full">
          <Routes>

          <Route path='/' element={<ViewUsers/>} />
            <Route path='/viewusers' element={<ViewUsers/>} />
            <Route path='/viewproducts' element={<ViewProducts/>} />
            <Route path='/viewOrders' element={<ViewOrders/>} />

            <Route path='/viewusers/edit/:userId' element={<EditUserDetails/>} />
            <Route path='/viewproducts/edit/:productId' element={<EditProductDetails/>} />
            <Route path='/viewOrders/edit/:orderId' element={<EditOrders/>} />

          </Routes>
        </div>
      </div>
    </Fragment>
  )
}

export default Admin