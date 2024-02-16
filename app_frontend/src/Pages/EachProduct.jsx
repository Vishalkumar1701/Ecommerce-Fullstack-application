import React, { useState, useEffect } from 'react'
import dress from '../assets/kid.jpg'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { addItemsToCart } from '../Actions/CartActions'
import {toast, ToastContainer} from 'react-toastify';

const EachProduct = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();


    const [productDetails, setProductDetails] = useState({});

    const [pname, setPname] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [desc, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [previewUrl, setPreviewUrl] = useState("")
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);



    const CONFIG_OBJ = {
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    const increaseQuantity = () => {
        const qty = quantity + 1;
        setQuantity(qty);
    };
    const decreaseQuantity = () => {
        if (quantity <= 1) return;
        const qty = quantity - 1;
        setQuantity(qty);
    }

    const addToCartHandler = async () => {
        try {
            await dispatch(addItemsToCart(productId, quantity));
            toast.success("Item Added to cart");
        } catch (error) {
            toast.error('Item cannot be added to cart try again later')
        }
    }

    //Get Single User Details
    const SingleProductDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/product/${productId}`, CONFIG_OBJ);
            if (response.status === 200) {
                setProductDetails(response.data.product);
                setPname(response.data.product.pname);
                setPrice(response.data.product.price);
                setCategory(response.data.product.category);
                setDescription(response.data.product.desc);
                setImage(response.data.product.image);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (productId) {
            SingleProductDetail();
        }
    }, [productId]);


    return (
        <div className='container-fluid'>
            <div className="min-h-screen py-3 container">
                <div className="productDetails flex gap-3 lg:flex-row md:flex-col sm:flex-col">
                    <div className="productImage">
                        <img src={productDetails.image} alt="Product Image" className='w-80 h-80 object-cover' />
                    </div>
                    <div className="productDetails w-1/2">
                        <div className="productName flex flex-col">
                            <span className='text-3xl font-bold'>{productDetails.pname}</span>
                            <span>Product Id : #{productDetails._id}</span>
                            <span>Category : <span>{productDetails.category}</span></span>
                        </div>
                        <hr />

                        <div className="rating">
                            4 Stars

                        </div>
                        <hr />

                        <div className="product_price mb-3">
                            <span className='text-xl font-semibold'>₹ {productDetails.price}</span>
                        </div>
                        <div className="addtoCart flex items-center gap-4 lg:flex-row md:flex-col sm:flex-col">
                            <button className='bg-black px-3 py-2 rounded-lg text-white' onClick={increaseQuantity}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <input type='number' className="screen text-center" value={quantity} disabled />
                            <button className='bg-black px-3 py-2 rounded-lg text-white' onClick={decreaseQuantity}> <FontAwesomeIcon icon={faMinus} /> </button>

                            <button className='btn btn-primary' onClick={addToCartHandler}><FontAwesomeIcon icon={faCartShopping} /> Add to Cart</button>
                        </div>
                        <hr />
                        <div className="productDescription">
                            <h5>Description :</h5>
                            <span>{productDetails.desc}</span>
                        </div>
                        <div className="submitreview">

                        </div>
                    </div>
                </div>
                <hr />
                <div className="productRieviews text-center">
                    <h4>Reviews</h4>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default EachProduct
