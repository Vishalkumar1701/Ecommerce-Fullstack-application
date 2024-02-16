import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import { Pagination } from 'react-bootstrap'
import {toast, ToastContainer} from 'react-toastify'

const AllProducts = () => {

    const [allProducts, setAllProducts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [price, setPrice] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const CONFIG_OBJ = {
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }

    const getAllProducts = async () => {
        try {

            const queryParams = {
                page: currentPage,
            };
            if (searchKeyword) {
                queryParams.keyword = searchKeyword;
            }
            if (categoryFilter) {
                queryParams.category = categoryFilter;
            } else {
                delete queryParams.category;
            }
            if (price && price.gte && price.lt) {
                queryParams['price[gte]'] = price.gte;
                queryParams['price[lt]'] = price.lt;
            }

            const url = `http://localhost:4000/allProducts?${new URLSearchParams(queryParams).toString()}`;
            const response = await axios.get(url, CONFIG_OBJ);
            if (response.status === 200) {
                setAllProducts(response.data.Products)
                setTotalPages(response.data.Products / 8);
            }
        } catch (error) {
            toast.error(error)
        }
    }
    useEffect(() => {
        getAllProducts();
    }, [searchKeyword, categoryFilter, price, currentPage]);
    
    const handlePriceChange = (value) => {
        if (value === '') {
            setPrice('');
        } else {
            const [minPrice, maxPrice] = value.split('-');
            setPrice({ gte: minPrice, lt: maxPrice });
        }

    }

    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === currentPage}>
                {number}
            </Pagination.Item>,
        );
    }
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    return (
        <div>
            <div className="topbar bg-gray-800 p-3 flex items-center gap-3 justify-end lg:flex-row md:flex-col sm:flex-col">
                <input className="form-control" style={{ width: '20rem' }} type='search' placeholder="Enter Product name..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
                <select className='form-select' value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={{ width: '15rem' }}>
                    <option value="">Category</option>
                    <option value="Kids">Kids Wear</option>
                    <option value="Male">Men</option>
                    <option value="Female">Women</option>
                </select>

                <select value={price} className='form-select' onChange={(e) => handlePriceChange(e.target.value)} style={{ width: '15rem' }}>
                    <option value=''>Price</option>
                    <option value='100-1000'>100-1000</option>
                    <option value='1001-2000'>1001-2000</option>
                    <option value='2001-3000'>2001-3000</option>
                    <option value='3001-4000'>3001-4000</option>
                    <option value='4001-5000'>4001-5000</option>
                </select>

            </div>
            <div className="products container py-3">
                <div className="row">{

                    allProducts.map(product => (
                        <div key={product._id} className="col-md-3">
                            <Link to={`/allproducts/${product._id}`} className="no-underline flex flex-row" >
                                <div className="card mt-2 mr-4" style={{ width: '18rem', height: '20.5rem' }}>
                                    <img src={product.image} className="card-img-top h-52 object-cover" alt="..." />
                                    <div className="card-body">
                                        <div className="main flex justify-between mb-1">
                                            <h5 className="card-title">{product.pname}</h5>
                                            <button className='bg-black text-white px-2 py-1 rounded-md'><FontAwesomeIcon icon={faCartShopping} /></button>
                                        </div>
                                        <h6 className="card-title text-sm ">{product.desc}</h6>
                                        <h6 className="card-title">₹{product.price}</h6>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                }
                </div>
            </div>
            <div className='flex justify-center'>
                <Pagination>
                    {items.map((item,index) => (
                        <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default AllProducts
