import React from 'react'
import logo from '../assets/logo.png'

const Footer = () => {
    return (
        <div className="footer bg-gray-900">
            <div className='container p-4 flex justify-between items-center lg:flex-row md:flex-col sm:flex-col '>
                <div className="logo flex flex-col items-center mb-2 text-center">
                    <img src={logo} alt="logo" className='w-20' />
                    <h4 className='text-white'>Clothes Closet</h4>
                </div>
                <div className="explore-links mb-2 text-center">
                    <h3 className='text-white text-4xl'>Explore</h3>
                    <a href="#" className='block text-white no-underline text-2xl'>Kids</a>
                    <a href="#" className='block text-white no-underline text-2xl'>Women</a>
                    <a href="#" className='block text-white no-underline text-2xl'>Men</a>
                </div>
                <div className="contact-links mb-2 text-center">
                    <h3 className='text-white text-4xl'>Contact Us</h3>
                    <a href="#" className='block text-white no-underline text-2xl'>Support Mail</a>
                    <a href="#" className='block text-white no-underline text-2xl'>Customer Care</a>
                </div>
            </div>
            <div className="bottom-line py-2 text-center text-white">
                &copy;EcommerceWebsite-2024
            </div>
        </div>
    )
}

export default Footer
