import React, { useState } from 'react'
import logo from '../assets/Clothes.png'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = localStorage.getItem("user");
  const userToken = localStorage.getItem("token")
  const loggedInUser = JSON.parse(userDetails);

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: "LOGIN_ERROR" });
    navigate('/login');
  }

  return (
    <>
      <Navbar expand="lg" className="bg-gray-900 navbar navbar-expand-lg sticky-top navbar-light">
        <Container className=''>
          <Navbar.Brand href="/homepage"><img src={logo} alt="logo" width={50} className='rounded-xl' /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-white' />
          <Navbar.Collapse id="basic-navbar-nav">
            {
              userToken ? <Nav className="justify-center items-center w-full gap-10">
                <Link to="/homepage" className='text-white no-underline'><span className='font-bold text-lg hover:text-gray-300'>Home</span></Link>
                <Link to="/allproducts" className='text-white no-underline'><span className='font-bold text-lg hover:text-gray-300'>Store</span></Link>
                <Link to="/contact" className='text-white no-underline'><span className='font-bold text-lg hover:text-gray-300'>Contact Us</span></Link>
              </Nav> : ''
            }

            {
              userToken ? <Nav className=''>
                <div className="profile flex gap-4 items-center">
                  <Link to="/cart" className='text-white no-underline'> <FontAwesomeIcon className='font-bold text-lg hover:text-gray-300' icon={faCartShopping}/> </Link>

                  <DropdownButton id="dropdown-basic-button" className='w-full text-center my-3' title={`Welcome, ${loggedInUser.name}`}>
                    <Dropdown.Item> <Link to="/profile" className='text-black no-underline'>My Profile</Link></Dropdown.Item>
                    {
                      loggedInUser.isAdmin ? 
                      <Dropdown.Item ><Link to="/admin" className='text-black no-underline'>Admin Dashboard</Link></Dropdown.Item> : ''
                    }

                    <Dropdown.Item href="#" onClick={() => logOut()}>Logout</Dropdown.Item>
                  </DropdownButton>
                </div>
              </Nav> : ''
            }


          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header 