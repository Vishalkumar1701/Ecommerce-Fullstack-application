import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phnumber, setPhnumber] = useState("");
    const [address, setAddress] = useState([]);
    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const signup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const req_data = {
                name, email, password, phnumber, address, username
            }
            const response = await axios.post('http://localhost:4000/signup', req_data);
            if(response.status == 201){
                setLoading(false)
                toast.success("User registered successfully");
                navigate('/login')
            }
        } catch (error) {
            setLoading(false);
            toast.error('Few details are left blank or are Invalid try again later')
        }
    }
    return (
        <div className='container-fluid bg-gray-300 min-h-screen py-10'>
            <div className='container flex justify-center'>
                <div className="bg-gray-100 rounded-xl shadow-lg w-97">
                    <div className="login-form px-5 py-6">
                        <h2 className='font-serif font-bold text-center py-3'>SignUp</h2>
                        <form action="" onSubmit={(event) => signup(event)}>

                            <div className="form-floating mb-3">
                                <input type="text" 
                                className="form-control" 
                                id="floatingInput" 
                                placeholder="Enter Fullname"
                                value={name}
                                onChange={(ev)=> setName(ev.target.value)} 
                                />
                                <label htmlFor="floatingInput">Full Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" 
                                className="form-control" 
                                id="floatingInput" 
                                placeholder="Enter Username"
                                value={username}
                                onChange={(ev) => setUsername(ev.target.value)}
                                />
                                <label htmlFor="floatingInput">Username</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="number" 
                                className="form-control" 
                                id="floatingInput" 
                                placeholder="Enter phone number" 
                                value={phnumber}
                                onChange={(ev) => setPhnumber(ev.target.value)}
                                />
                                <label htmlFor="floatingInput">Phone Number</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email" 
                                className="form-control" 
                                id="floatingInput" 
                                placeholder="name@example.com" 
                                value={email}
                                onChange={(ev)=> setEmail(ev.target.value)}
                                />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" 
                                className="form-control" 
                                id="floatingPassword" 
                                placeholder="Password" 
                                value={password}
                                onChange={(ev) => setPassword(ev.target.value)}                                
                                />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" 
                                className="form-control" 
                                id="floatingPassword" 
                                placeholder="Address" 
                                value={address}
                                onChange={(ev) => setAddress(ev.target.value)}                                
                                />
                                <label htmlFor="floatingPassword">Enter Address</label>
                            </div>

                            <button type="submit" className='btn btn-primary my-4 px-5 py-2 d-flex items-center'><span className='font-semibold'>Signup</span> {loading ? <div className='inline ml-3'>
                                    <div className="spinner-border text-light" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div> : ''} </button>
                        </form>
                        <p className='font-serif'>Already have an account? <Link to="/login" className='no-underline '>Login</Link></p>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Signup
