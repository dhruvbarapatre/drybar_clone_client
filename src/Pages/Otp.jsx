import React, { useState } from 'react'
import Navbar from "../Components/Navbar"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import OtpInput from 'react-otp-input';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Otp = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length < 6) {
      return toast.info("Pleas.Enter Valid Otp.")
    }

    axios.post(`${import.meta.env.VITE_APP_BE_URL}/user/verify`, { otp }, { withCredentials: true })
      .then(res => {
        toast.success(res.data.message)
        if (res.data.message == "User Created SuccesFully...") {
          setTimeout(() => {
            navigate("/");  // 🔹 Change "/dashboard" to your desired page
          }, 2000);
        }
      })
      .catch(err => {
        toast.error(err.response.data)
        console.log(err)
      })
  };


  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div className="border">
          <h4 style={{ textAlign: "center" }}>Verify Otp</h4>
          <form onSubmit={handleSubmit} action="">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => <input {...props} />}
              inputStyle={{
                width: "50px",
                height: "50px",
                fontSize: "30px",
                borderRadius: "10px",
                border: "2px solid #000",
                margin: "0 5px",
                textAlign: "center",
              }}
            />
            <input className='mt-4 btn' type="submit" value="Verify Otp" />
          </form>
          <Link to={"/sign-up"}><p className='mt-2'>Entered Wrong Email ???</p></Link>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  )
}

export default Otp
