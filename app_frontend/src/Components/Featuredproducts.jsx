import React from 'react';
import men from '../assets/menfeatured.jpg';
import kid from '../assets/kidsfeatured.jpg';
import women from '../assets/femalefeatured.jpg';
import { Link } from 'react-router-dom';

const Featuredproducts = () => {
  return (
    <div className='bg-gray-300'>
      <div className='container py-3 flex gap-3 lg:flex-row md:flex-col sm:flex-col'>
        <div className="card rounded-xl overflow-hidden" style={{ maxWidth: '25rem' }}>
          <div className="card_image mb-1">
            <img src={men} alt="men" className='w-97 h-80 object-cover' />
          </div>
          <div className="card_desc text-center font-semibold px-2 py-3">
            <div className="storeBtn text-right">
              <Link to='/allproducts' className='text-gray-800 no-underline'>Go to Store &gt; </Link>
            </div>
          </div>

        </div>

        <div className="card rounded-xl overflow-hidden" style={{ maxWidth: '25rem' }}>
          <div className="card_image mb-1">
            <img src={women} alt="men" className='w-97 h-80 object-cover' />
          </div>
          <div className="card_desc text-center font-semibold px-2 py-3">
            <div className="storeBtn text-right">
              <Link to='/allproducts' className='text-gray-800 no-underline'>Go to Store &gt; </Link>
            </div>
          </div>

        </div>

        <div className="card rounded-xl overflow-hidden" style={{ maxWidth: '25rem' }}>
          <div className="card_image mb-1">
            <img src={kid} alt="men" className='w-97 h-80 object-cover' />
          </div>
          <div className="card_desc text-center font-semibold px-2 py-3">
            <div className="storeBtn text-right">
              <Link to='/allproducts' className='text-gray-800 no-underline'>Go to Store &gt; </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Featuredproducts
