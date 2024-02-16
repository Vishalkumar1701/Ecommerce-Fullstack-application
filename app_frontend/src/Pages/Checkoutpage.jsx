import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingInfo } from "../Actions/CartActions";
import { Country, State } from "country-state-city";
import {toast, ToastContainer} from 'react-toastify'



const Checkoutpage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { shippingInfo } = useSelector((state => state.cart));

    const [address, setAddress] = useState(shippingInfo ? shippingInfo.address : '');
    const [city, setCity] = useState(shippingInfo ? shippingInfo.city : '');
    const [state, setState] = useState(shippingInfo ? shippingInfo.state : '');
    const [country, setCountry] = useState(shippingInfo ? shippingInfo.country : '');
    const [pincode, setPincode] = useState(shippingInfo ? shippingInfo.pincode : '');
    const [phNumber, setPhNumber] = useState(shippingInfo ? shippingInfo.phNumber : '');

    const shippingSubmit = (e) => {
        e.preventDefault();

        if(phNumber.length !== 10) {
            toast.error('Phone number should have 10 digits');
            return;
        }

        dispatch(
            saveShippingInfo({
                address,
                city,
                state,
                country,
                pincode,
                phNumber
            })

        );
        navigate('/order-confirmation')
    }


    return (
        <div className='container-fluid bg-gray-300'>
            <div className="container py-2 min-h-screen">
                {/* Generate order details  */}
                <div className="section2 border border-gray-950 text-center px-4 py-2 rounded-xl hover:shadow-lg bg-white">
                    <h3>Shipping Information</h3>
                </div>
                {/* Confirm your address  */}
                <div className="section3 border border-gray-950 px-4 py-2 rounded-xl mt-3 hover:shadow-lg  bg-white">
                    <h5>Confirm Your Address</h5>
                    <hr />
                    <form action="" onSubmit={shippingSubmit}>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phnumber"  className="form-label">Phone Number</label>
                            <input type="number" className="form-control" value={phNumber} onChange={(e) => setPhNumber(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pincode" className="form-label">Pin Code</label>
                            <input type="number" className="form-control" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} required />
                        </div>
                        <select className='form-select mb-3' value={country} onChange={(e) => setCountry(e.target.value)} required>
                            <option value="">Country</option>
                            {
                                Country &&
                                Country.getAllCountries().map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                ))
                            }
                        </select>
                        <select className='form-select mb-3' value={state} onChange={(e) => setState(e.target.value)}>
                            <option value="">State</option>
                            {
                                State &&
                                State.getStatesOfCountry(country).map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                ))
                            }
                        </select>
                        <div className="mb-3">
                            <input type="submit" className='btn btn-primary w-full' />
                        </div>
                    </form>
                </div>
            </div >
            <ToastContainer/>
        </div >
    )
}

export default Checkoutpage
