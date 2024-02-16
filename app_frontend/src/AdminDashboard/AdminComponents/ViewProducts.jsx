import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import {toast, ToastContainer} from 'react-toastify'

const ViewProducts = () => {


  const [show, setShow] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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

  //Add Product
  const addProducts = async (e) => {
    e.preventDefault();

    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "ecommerce-shop")
    data.append("cloud_name", "drmipzcan")
    const response = await axios.post("https://api.cloudinary.com/v1_1/drmipzcan/image/upload", data)
    const imageUrl = response.data.url;

    const productData = {
      pname, price, desc, category, image: imageUrl
    };
    setLoading(true);
    await axios.post('http://localhost:4000/addProduct', productData, CONFIG_OBJ);
    setLoading(false)
    setAllProducts([...allProducts, productData]);
    handleClose();
    toast.success("Product Added");
  }
  //Update image preview
  const handleImageChange = (ev) => {
    const selectedImage = ev.target.files[0];
    setImage(selectedImage);
    setPreviewUrl(URL.createObjectURL(selectedImage));
  }

  //Get all Products
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

  //Delete a Product
  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/deleteProduct/${productId}`, CONFIG_OBJ);
      if (response.status === 200) {
        toast.success('Product deleted succesfully')
        getAllProducts();
      }
    } catch (error) {
      toast.error('some error occured while deleting this product');
    }
  }

  return (
    <>
      <div className='bg-gray-200 min-h-screen'>
        <div className="container flex justify-between items-center pt-4">
          <h2>All Products</h2>
          <button className='btn btn-primary' onClick={handleShow}> Add Products</button>
        </div>
        <hr />
        <div className="">
          <table className='table-auto w-full text-center border border-black'>
            <thead>
              <tr className='border border-secondary'>
                <th className=''>Image</th>
                <th className=''>Product name</th>
                <th className=''>Price</th>
                <th className=''>Category</th>
                <th className=''></th>
              </tr>
            </thead>
            <tbody>
              {
                allProducts.map((products) => {
                  return (
                    <tr key={products._id} className='border border-secondary'>
                      <td className='flex justify-center py-2'>
                        <img src={products.image} alt="productimg" className='w-20 h-16 object-cover' />
                      </td>
                      <td className=''>{products.pname}</td>
                      <td className=''>{products.price}</td>
                      <td className=''>{products.category}</td>
                      {/* <td className='border border-black'></td> */}
                      <td className=''>
                        <button className='border bg-sky-600 px-2 rounded-lg py-1'>
                          <Link to={`/admin/viewproducts/edit/${products._id}`} className='text-white no-underline' >Edit</Link>
                        </button>
                        <button className='border bg-red-600 px-2 rounded-lg py-1 ml-2' onClick={() => deleteProduct(products._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>

        {/* modal to add users */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="" onSubmit={(event) => addProducts(event)}>
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
                <input className="form-control mb-5" type="file" id="formFile" accept='image/*' onChange={handleImageChange} required />
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
              <button type='submit' className='btn btn-primary mt-20 w-full justify-center d-flex items-center'> <span>Add Product </span>{loading ? <div className='inline ml-3'>
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div> : ''} </button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>

        </Modal>
      </div>
      <ToastContainer/>
    </>
  )
}

export default ViewProducts
