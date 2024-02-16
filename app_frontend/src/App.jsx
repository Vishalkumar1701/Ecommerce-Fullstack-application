import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Header from './Components/Header'
import Homepage from './Pages/Homepage'
import Footer from './Components/Footer'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Contact from './Pages/Contact'
import AllProducts from './Pages/AllProducts'
import Admin from './AdminDashboard/Admin'
import Cartpage from './Pages/Cartpage'
import CustomerProfile from './Pages/CustomerProfile'
import Checkoutpage from './Pages/Checkoutpage'
import EachProduct from './Pages/EachProduct'
import NewOrder from './Pages/NewOrder'
import Payment from './Pages/Payment'
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch } from 'react-redux'

const App = () => {

  const [stripeApiKey, setStripeApiKey] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const CONFIG_OBJ = {
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }

  async function getStripeApiKey() {
    const { data } = await axios.get("http://localhost:4000/stripeapikey", CONFIG_OBJ);
    setStripeApiKey(data.stripeApiKey);
  }

  // Implementation of Dynamic routing 
  const DynamicRouting = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("user"));

      if (userData) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
        setIsLoggedIn(true);
        navigate('/homepage')
        getStripeApiKey();
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: 'LOGIN_ERROR' });
        setIsLoggedIn(false);
        navigate('login')
      }
      
    }, []);
    return (
      <>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/homepage' element={<Homepage />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/allproducts' element={<AllProducts />} />
          <Route path='/admin/*' element={<Admin />} />
          <Route path='/cart' element={<Cartpage />} />
          <Route path='/profile' element={<CustomerProfile />} />
          <Route path='/checkout' element={<Checkoutpage />} />
          <Route path='/order-confirmation' element={<NewOrder />} />
          <Route path='/allproducts/:productId' element={<EachProduct />} />
          <Route path='/orderPayment' element={
            stripeApiKey ? (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            ) : null
          } />
        </Routes>
      </>
    )
  }



  return (
    <div>
      <Router>
        <Header />
        <DynamicRouting/>
        {isLoggedIn ? <Footer /> : ''}
      </Router>
    </div>
  )
}

export default App
