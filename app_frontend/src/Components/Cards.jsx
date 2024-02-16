import React from 'react'
import kid from '../assets/kid.jpg';
import men from '../assets/men.jpg';
import women from '../assets/women.jpg'
import shopping from '../assets/shopping-bag.png'
import { Link } from 'react-router-dom';


const Cards = () => {

    return (
        <div className='bg-gray-300'>
            <div className='container py-4'>
                <div id="carouselExampleCaptions" className="carousel slide rounded-lg">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={women} className="d-block w-100 h-80 object-cover rounded-lg" alt="..." />
                            <div className="carousel-caption">
                                <div className='py-2 rounded-xl flex items-center justify-center'>
                                    <button><Link to='/allproducts' className='text-white bg-red-600 px-3 py-2 rounded-lg flex gap-2 items-center no-underline'><img src={shopping} alt="" className='w-8' /> Shop Now &gt;</Link></button>
                                </div>
                                <p className='font-bold'>Diverse and dynamic, women's fashion embraces individuality with flowing dresses, statement accessories, and timeless classics for every occasion.</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={kid} className="d-block w-100 h-80 object-cover rounded-lg" alt="..." />
                            <div className="carousel-caption">
                                <div className='py-2 rounded-xl flex items-center justify-center'><button><Link to='/allproducts' className='text-white bg-red-600 px-3 py-2 rounded-lg flex gap-2 items-center no-underline'><img src={shopping} alt="" className='w-8' /> Shop Now &gt;</Link></button></div>
                                <p className='font-bold'>Playful comfort in vibrant colors and cute patterns, creating adorable and charming wardrobes for children.</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={men} className="d-block w-100 h-80 object-cover rounded-lg" alt="..." />
                            <div className="carousel-caption">
                                <div className='py-2 rounded-xl flex items-center justify-center'> <button><Link to='/allproducts' className='text-white bg-red-600 px-3 py-2 rounded-lg flex gap-2 items-center no-underline'><img src={shopping} alt="" className='w-8' /> Shop Now &gt;</Link></button></div>
                                <p className='font-bold'>Modern elegance meets casual chic, blending tailored suits, denim, and stylish sneakers for versatile sophistication.</p>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cards
