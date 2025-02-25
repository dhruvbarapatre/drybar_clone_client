import React, { useEffect, useState } from 'react'
import { Navbar } from 'react-bootstrap'
import Footer from '../Components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_APP_BE_URL}/user/signin`, data, { withCredentials: true })
      .then(res => {
        toast.success(res.data.message)
        setTimeout(() => {
          navigate("/");  // 🔹 Change "/dashboard" to your desired page
        }, 2000);
      })
      .catch(err => {
        toast.error(err.response.data.message);
      })
  }

  return (
    <div className='login'>
      <Navbar />
      <h1 className='text-center'>LOGIN PAGE</h1>
      <div className="d-flex justify-content-center algin-items-center">
        <div className="border">
          <h4>Login</h4>
          <form action="" onSubmit={handlesubmit}>
            <input onChange={(e) => handleChange(e)} name='email' type="email" placeholder='Enter Your Email' />
            <input onChange={(e) => handleChange(e)} name='password' className='mt-4' type="password" placeholder='Enter Your Password' />
            <input className='mt-4 btn' type="submit" value="Sign In" />
          </form>
          <Link to={"/sign-up"}><p className='mt-2'>Don't Have Account ?</p></Link>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  )
}

export default Login;