import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import {toast, ToastContainer } from 'react-toastify';


const EditUserDetails = () => {

  const { userId } = useParams();
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(false);

  //Customer details
  const [name, setName] = useState("");
  const [phnumber, setPhnumber] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [isAdmin, setisAdmin] = useState(false)

  const CONFIG_OBJ = {
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }

  //SHOW SINGLE USER DETAILS
  const singleUserDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/userDetails/${userId}`, CONFIG_OBJ);
      if (response.status === 200) {
        setUserData(response.data.user);
        setName(response.data.user.name);
        setPhnumber(response.data.user.phnumber);
        setEmail(response.data.user.email);
        setUsername(response.data.user.username);
        setAddress(response.data.user.address);
        setisAdmin(response.data.user.isAdmin);
      }
    } catch (error) {
      console.log(error)
    }
  }
  

  //EDIT USER
  const Edituser = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const updateduser = {
        name,
      phnumber,
      email,
      password,
      username,
      address,
      isAdmin,
      };
      
      const response = await axios.put(`http://localhost:4000/editUser/${userId}`, updateduser, CONFIG_OBJ);
      if (response.status === 200) {
        setLoading(false);        
        setUserData(response.data.user);
        singleUserDetail();
        toast.success('User edited')
      }
    } catch (error) {
      setLoading(false)
      toast.error('some error occured while editing user')
    }
  }
  useEffect(() => {
    if (userId) {
      singleUserDetail();
    }
  }, [userId]);

  return (
    <>
      <div className="userPreview py-3 w-full flex justify-center">
        <Card border="secondary" style={{ width: '18rem' }}>
          <Card.Header className='capitalize'>{userData.name}</Card.Header>
          <Card.Body>
            <Card.Title>Details</Card.Title>
            <Card.Text>
              UserName &rarr; <span className='font-bold'>{userData.username}</span><br />
              Phone number &rarr; <span className='font-bold'>{userData.phnumber}</span><br />
              Email Id &rarr; <span className='font-bold'>{userData.email}</span><br />
              Address &rarr; <span className='font-bold'>{userData.address}</span><br />
              Admin &rarr; <span className='font-bold'>{
                userData.isAdmin ? "Admin" : "Not Admin"
              }</span><br />
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="editForm">
        <h2>Edit {userData.name} Details</h2>

        <form action="" className='py-4' onSubmit={(e) => Edituser(e)}>
          <div className="form-floating mb-3">
            <input type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              className="form-control"
              id="floatingInput"
              placeholder="Name" />
            <label htmlFor="floatingInput">Name</label>
          </div>
          <div className="form-floating mb-3">
            <input type="number"
              value={phnumber}
              onChange={(ev) => setPhnumber(ev.target.value)}
              className="form-control"
              id="floatingInput"
              placeholder="Phnumber" />
            <label htmlFor="floatingInput">Phone Number</label>
          </div>
          <div className="form-floating mb-3">
            <input type="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="form-control"
              id="floatingInput"
              placeholder="Email" />
            <label htmlFor="floatingInput">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
              className="form-control"
              id="floatingInput"
              placeholder="Username" />
            <label htmlFor="floatingInput">UserName</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              className="form-control"
              id="floatingInput"
              placeholder="Password" />
            <label htmlFor="floatingInput">Password</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text"
               value={address}
              onChange={(ev) => setAddress(ev.target.value)}
              className="form-control"
              id="floatingInput"
              placeholder="Address" />
            <label htmlFor="floatingInput">Address</label>
          </div>
          <div className="form-check form-switch mb-3">
            <input type="checkbox"
              role='switch'
              checked = {isAdmin}
              onChange={(ev) => setisAdmin(ev.target.checked)}
              className="form-check-input"
              id="flexSwitchCheckDefault" />
            <label className='from-check-label' htmlFor="flexSwitchCheckChecked">Admin</label>
          </div>

          <button type='submit' className='btn btn-primary w-full'>
            <span>Create User </span>{loading ? <div className='inline ml-3'>
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div> : ''}
          </button>
        </form>
      </div>
      <ToastContainer/>
    </>
  )
}

export default EditUserDetails
