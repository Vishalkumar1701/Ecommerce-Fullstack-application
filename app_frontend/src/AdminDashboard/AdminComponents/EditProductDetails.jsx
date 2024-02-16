import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import {toast, ToastContainer} from 'react-toastify';

const EditProductDetails = () => {

  const { productId } = useParams();

  const [productDetails, setProductDetails] = useState({});

  const [pname, setPname] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [desc, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState("")
  const [loading, setLoading] = useState(false);

  const CONFIG_OBJ = {
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }

  //Get Single Produc Details
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

  const editProduct = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    try {
      const data = new FormData()
      data.append("file", image)
      data.append("upload_preset", "ecommerce-shop")
      data.append("cloud_name", "drmipzcan")
      const response = await axios.post("https://api.cloudinary.com/v1_1/drmipzcan/image/upload", data)
      const imageUrl = response.data.url;
      const updatedProduct = {
        pname,
        price,
        category,
        desc,
        image: imageUrl
      }
      const response1 = await axios.put(`http://localhost:4000/editProduct/${productId}`, updatedProduct, CONFIG_OBJ);

      if (response1.status === 200) {
        setLoading(false)
        setProductDetails(response.data.product);
        SingleProductDetail();
        toast.success('Product edited')
      }
    } catch (error) {
      setLoading(false)
      toast.error('Some error occured while editing this product')
    }
  }
  const handleImageChange = (ev) => {
    const selectedImage = ev.target.files[0];
    setImage(selectedImage);
    setPreviewUrl(URL.createObjectURL(selectedImage));
  }

  return (
    <div className="py-2">
      <div className="product-preview w-full flex justify-center">
       { productDetails && (
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={productDetails && productDetails.image} />
          <Card.Body>
            <Card.Title>{productDetails.pname}</Card.Title>
            <Card.Title> <h5>{productDetails.price}</h5> </Card.Title>
            <Card.Text>
              <span className="desc">
                {productDetails.desc}
              </span>
              <span className="category">
                {productDetails.category}
              </span>
            </Card.Text>
          </Card.Body>
        </Card>
        )}
      </div>
      <div className="product-form pt-3">
        <h2>Edit Product Details</h2>
        <form action="" onSubmit={(event) => editProduct(event)}>
          <div className="form-floating mb-3">
            <input type="text"
              value={pname}
              onChange={(ev) => setPname(ev.target.value)}
              className="form-control"
              id="floatingInput"
              placeholder="Product Name" />
            <label htmlFor="floatingInput">Product Name</label>
          </div>
          <div className="form-floating mb-3">
            <input type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
              className="form-control"
              id="floatingInput"
              placeholder="Add Price" />
            <label htmlFor="floatingInput">Add Price </label>
          </div>
          <div className="form-floating">
            <textarea className="form-control"
              value={desc}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder="Add Description"
              id="floatingTextarea"></textarea>
            <label htmlFor="floatingTextarea">Description</label>
          </div>
          <div className="category mb-3">
            <p>Select One Category</p>
            <select className="form-select"
              value={category}
              onChange={(ev) => setCategory(ev.target.value)}
              aria-label="Default select example">
              <option value="Kids">Kids</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>
          <div className="product-image mb-3">
            <p>Select an image</p>
            <input className="form-control mb-5" type="file" id="formFile" accept='image/*' onChange={handleImageChange} />
            <div className="preview-section w-52 border rounded-lg">
              {
                previewUrl ? (
                  <>
                    <img src={previewUrl} alt='product image' className='object-cover rounded-lg' />
                  </>
                ) : (
                  <p className='text-center text-gray-400'>Image Preview appears here</p>
                )
              }
            </div>
          </div>
          <button type='submit' className='btn btn-primary mt-20 w-full my-4 px-5 py-2 d-flex items-center justify-center'> <span>Update Product</span>
          {loading ? <div className='inline ml-3'>
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div> : ''}</button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default EditProductDetails
