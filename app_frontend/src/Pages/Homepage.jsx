import React from 'react'
import clothesBanner from '../assets/clothesbanner.jpg'
import Cards from '../Components/Cards'
import Featuredproducts from '../Components/Featuredproducts'

const Homepage = () => {
  return (
    <div>
      <div className="main-section bg-gradient-to-r from-gray-900 to-gray-500 relative">
        <img src={clothesBanner} alt="main" className='h-90vh w-full object-cover mix-blend-overlay' />
        <div className="main-disc absolute top-0 flex flex-col justify-center items-center w-full h-full">
          <h1 className='text-8xl font-extrabold stencil-text mb-4'>Clothes Closet</h1>
          <h5 className="font-extrabold text-white">Experience Fashion Nirvana : Elevate Your Wardrobe & Embrace Confidence.</h5>
        </div>
      </div>
      <div className="fproducts">
        <div className="featuredproducts py-2 font-serif text-center">
          <h1 className='text-6xl'>F<span className='text-3xl'>eatured</span> P<span className='text-3xl'>roducts</span></h1>
        </div>
        <Featuredproducts />
      </div>
      <div className="card-section">
        <div className="store-section py-2 font-serif text-center">
          <h1 className='text-6xl'>E<span className='text-3xl'>xplore</span> O<span className='text-3xl'>ur</span> S<span className='text-3xl'>tore</span></h1>
        </div>
        <Cards />
      </div>
    </div>
  )
}

export default Homepage
