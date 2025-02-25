import React, { useState } from 'react';
import { Navbar } from 'react-bootstrap';
import Footer from '../Components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [data, setData] = useState({});
  const [isLoading, serisLoading] = useState(false)
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    serisLoading(true)
    axios.post(`${import.meta.env.VITE_APP_BE_URL}/user/signUP`, data, { withCredentials: true })
      .then(res => {
        toast.success(res.data)
        serisLoading(false)
        if (res.data == "Otp Successfully Sent") {
          setTimeout(() => {
            navigate("/verify");  // 🔹 Change "/dashboard" to your desired page
          }, 2000);
        }
      })
      .catch(err => {
        serisLoading(false)
        toast.error(err.response.data)
      })
  };


  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center">
        <div className="border">
          <h4 style={{ textAlign: "center" }}>Sign Up</h4>
          <form onSubmit={handleSubmit} action="">
            <input required onChange={handleChange} name='email' type="email" placeholder='Enter Your Email' />
            <input required onChange={handleChange} name='name' type="text" className='mt-4' placeholder='Enter Your Name' />
            <input required onChange={handleChange} name='password' className='mt-4' type="password" placeholder='Enter Your Password' />
            <button className='mt-4 btn' type='submit' disabled={isLoading}>
              {isLoading ? <div className="loader m-auto"></div> : <span>Send Otp</span>}
            </button>
          </form>
          <Link to={"/login"}><p className='mt-2'>Have An Account?</p></Link>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default SignUp;