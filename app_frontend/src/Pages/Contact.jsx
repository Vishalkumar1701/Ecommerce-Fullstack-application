import React from 'react'
import contact from '../assets/contact.jpg'

const Contact = () => {
    return (
        <div>
            <div className="contact-content flex w-full bg-gray-200 justify-center min-h-screen items-center">
                <div className=" bg-gray-600 rounded-xl p-4 w-97">
                    <h2 className='text-center text-white py-2'>Contact Us</h2>
                    <h4 className='text-white'>Write to us....</h4>
                    <form action="">
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating">
                            <textarea className="form-control" placeholder="Write your quaries or feedback here" id="floatingTextarea2"></textarea>
                            <label htmlFor="floatingTextarea2">Write your quaries or feedback</label>
                        </div>
                        <button type="submit" className='btn btn-primary mt-4 px-5 py-2'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact
