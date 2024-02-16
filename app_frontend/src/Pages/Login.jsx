import React, { useState } from 'react'
import loginimage from '../assets/login.jpg'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';



const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res_data = {
                email, password
            }
            const response = await axios.post('http://localhost:4000/signin', res_data)
            if (response.status == 200) {
                setLoading(false)
                localStorage.setItem("token", response.data.result.token);
                localStorage.setItem("user", JSON.stringify(response.data.result.user));
                toast.success('user Logged In successfully')
                dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.result.user });
                navigate('/homepage')
            }
        } catch (error) {
            setLoading(false)
            toast.error('user not found')
        }
    }

    return (
        <>
            <div className='container-fluid bg-gray-300 min-h-screen py-10'>
                <div className='container flex justify-center'>
                    <div className="bg-gray-100 rounded-xl shadow-lg w-97">
                        <div className="login-form px-5 py-2">
                            <h2 className='font-serif font-bold text-center py-6'>Login</h2>
                            <h2 className='font-serif font-bold py-2'>Welcome,</h2>
                            <form action="" onSubmit={(ev) => login(ev)}>
                                <div className="form-floating mb-3">
                                    <input type="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="name@example.com" />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating">
                                    <input type="password"
                                        className="form-control"
                                        id="floatingPassword"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)} />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <button type="submit" className='btn btn-primary my-4 px-5 py-2 d-flex items-center'><span className='font-semibold'>Login</span> {loading ? <div className='inline ml-3'>
                                    <div className="spinner-border text-light" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div> : ''} </button>
                                
                                
                            </form>
                            <p className='font-serif'>Don't have an account? <Link to="/signup" className='no-underline '>Signup</Link></p>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>

    )
}

export default Login
