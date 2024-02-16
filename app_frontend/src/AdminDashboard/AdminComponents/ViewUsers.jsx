import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import {toast, ToastContainer } from 'react-toastify';

const ViewUsers = () => {

  const { userId } = useParams();

  const [showUsers, setShowUsers] = useState([]);
  const [show, setShow] = useState(false);

  //Customer details
  const [name, setName] = useState("");
  const [phnumber, setPhnumber] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [isAdmin, setisAdmin] = useState(false)

  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const CONFIG_OBJ = {
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem('token')
    }
  }

  //GET ALL USERS
  const getAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/allUsers', CONFIG_OBJ)
      if (response.status === 200) {
        setShowUsers(response.data.users)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllUsers();
  }, [])

  // ADD USERS
  const AddUsers = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const req_data = {
        name, phnumber, email, password, username, address, isAdmin
      }
      const response = await axios.post('http://localhost:4000/addusers', req_data, CONFIG_OBJ)
      if (response.status === 201) {
        setLoading(false)
        handleClose();
        getAllUsers();
        setName("");
        setUsername("");
        setPhnumber("");
        setEmail("");
        setPassword("");
        setAddress("");
        setisAdmin(false);
        toast.success("User Added Successfully")
      }
    } catch (error) {
      setLoading(false)
      toast.error("Add later some error occured")
    }
  }

  //DELETE USER
  const Deleteuser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/deletUser/${userId}`, CONFIG_OBJ);
      if (response.status === 200) {
        toast.error('User Deleted')
        getAllUsers();
      }
    } catch (error) {
      toast.error('Some error occured while deleting user')
    }

  }


  return (
    <>
      <div className='bg-gray-200 min-h-screen'>
        <div className="container flex justify-between items-center pt-4">
          <h2>All Users</h2>
          <button className='btn btn-primary' onClick={handleShow}> Add Users</button>
        </div>
        <hr />
        <div className="user-table w-full">
          <table className='table-auto w-full text-center border border-black'>
            <thead>
              <tr className='border border-black'>
                <th className='border border-black'>Id</th>
                <th className='border border-black'>Name</th>
                <th className='border border-black'>UserName</th>
                <th className='border border-black'>Admin</th>
                <th className='border border-black'></th>
              </tr>
            </thead>
            <tbody>
              {
                showUsers.map((users) => {
                  return (
                    <tr key={users._id}>
                      <td className='border border-black'>{users._id.slice(-3)}</td>
                      <td className='border border-black'>{users.name}</td>
                      <td className='border border-black'>{users.username}</td>
                      <td className='border border-black'>{users.isAdmin ? "Admin" : "Not Admin"}</td>
                      <td className='border border-black p-2'>
                        <button className='border bg-sky-600 px-2 rounded-lg py-1'><Link to={`/admin/viewusers/edit/${users._id}`} className='text-white no-underline' >Edit</Link></button>
                        <button className='border bg-red-600 px-2 rounded-lg py-1 ml-2' onClick={() => Deleteuser(users._id)}>Delete</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>

          </table>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="" onSubmit={(event) => AddUsers(event)}>
              <div className="form-floating mb-3">
                <input type="text"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                  className="form-control"
                  id="floatingInput"
                  placeholder="Product Name" />
                <label htmlFor="floatingInput">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input type="number"
                  value={phnumber}
                  onChange={(ev) => setPhnumber(ev.target.value)}
                  className="form-control"
                  id="floatingInput"
                  placeholder="Product Name" />
                <label htmlFor="floatingInput">Phone Number</label>
              </div>
              <div className="form-floating mb-3">
                <input type="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  className="form-control"
                  id="floatingInput"
                  placeholder="Product Name" />
                <label htmlFor="floatingInput">Email</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text"
                  value={username}
                  onChange={(ev) => setUsername(ev.target.value)}
                  className="form-control"
                  id="floatingInput"
                  placeholder="Product Name" />
                <label htmlFor="floatingInput">UserName</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  className="form-control"
                  id="floatingInput"
                  placeholder="Product Name" />
                <label htmlFor="floatingInput">Password</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text"
                  value={address}
                  onChange={(ev) => setAddress(ev.target.value)}
                  className="form-control"
                  id="floatingInput"
                  placeholder="Product Name" />
                <label htmlFor="floatingInput">Address</label>
              </div>
              <div className="form-check form-switch mb-3">
                <input type="checkbox"
                  role='switch'
                  value={isAdmin}
                  onChange={(ev) => setisAdmin(ev.target.checked)}
                  className="form-check-input"
                  id="flexSwitchCheckDefault"
                  placeholder="Product Name" />
                <label className='from-check-label' htmlFor="flexSwitchCheckChecked">Admin</label>
              </div>

              <button type='submit' className='btn btn-primary w-full my-4 px-5 py-2 d-flex items-center'>
                <span>Create User</span>{loading ? <div className='inline ml-3'>
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div> : ''}
              </button>
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

export default ViewUsers
