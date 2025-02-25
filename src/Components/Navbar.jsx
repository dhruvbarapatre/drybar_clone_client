import { FaMinus, FaPlus } from "react-icons/fa";
import React, { useEffect, useState } from 'react'
import { IoLocation } from "react-icons/io5";
import { CiLogout, CiShoppingCart, CiUser } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { FiMenu, FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdDelete, MdRemoveShoppingCart } from 'react-icons/md';
import img from '../images/empty-cart.png'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const Navbar = () => {
  const [data, Setdata] = useState([])
  const [cart, setcart] = useState(0)
  const [sum, setsum] = useState(0)
  const [login, islogin] = useState(false)
  const [userData, setuserData] = useState([])

  const GetData = () => {
    axios.get(`${import.meta.env.VITE_APP_BE_URL}/cart/get`, { withCredentials: true })
      .then(res => {
        if (res.data.message == "Product Get Succesfully....") {
          Setdata(res.data.cart)
          TotalCost(res.data.cart)
          Checkcart(res.data.cart)
        }
      })
      .catch(err => {
        Setdata([])
        TotalCost([])
        Checkcart(false)
        console.log(err.response)
        if (err.response.data.message == "You Are Not Login....") {
          toast.error(err.response.data.message)
        }
      })
  }

  const delData = (id) => {
    axios.delete(`${import.meta.env.VITE_APP_BE_URL}/cart/removeCart/${id}`, { withCredentials: true })
      .then(res => {
        Setdata(el => el.filter(e => e.id !== id))
      })
      .catch(err => {
        console.log(err.response.data)
        toast.error(err.response.data.message)
      })
  }

  const TotalCost = (t) => {
    let Sumdata = 0
    for (let i = 0; i < t.length; i++) {
      Sumdata = Sumdata + Number(t[i].price * t[i].qty)
    }
    setsum(Math.round(Sumdata))
  }

  const handleQty = (change, productId) => {
    if (change == "inc") {
      axios.post(`${import.meta.env.VITE_APP_BE_URL}/cart/inc_qty/${productId}`, {}, { withCredentials: true })
        .then(res => {
          GetData()
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (change == "dec") {
      axios.post(`${import.meta.env.VITE_APP_BE_URL}/cart/dec_qty/${productId}`, {}, { withCredentials: true })
        .then(res => {
          Setdata(el => el.filter(e => e.id !== productId))
          GetData()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const getUser = () => {
    axios.get(`${import.meta.env.VITE_APP_BE_URL}/user/get`, { withCredentials: true })
      .then(res => {
        setuserData(res.data.user)
        islogin(true)
      })
      .catch(err => {
        console.log(err.response.data.message)
        islogin(false)
      })
  }

  

  useEffect(() => {
    getUser()
  }, [])

  const Checkcart = (data) => {
    data.length > 0 ? setcart(true) : setcart(false);
  }

  return (
    <>
      <div className="navber row d-b d-flex justify-content-center align-items-center w-100">
        <div className="logo col-6 col-sm-6 col-md-12 col-lg-3 col-xl-2 col-xxl-2 d-flex justify-content-center">
          <Link to={"/"}>
            <img className='img-1' src="https://www.drybar.com/media/logo/websites/73/drybar_logo_1.svg" alt="" />
            <img className='img-2' src="https://www.drybar.com/static/version1724185896/frontend/MagebitHoT/drybar/en_US/Magento_Theme/svg/logo-hairdryer.svg" alt="" />
          </Link>
        </div>
        <div className="d-none d-md-block col-12 col-lg-8 col-xl-9 col-xxl-9">
          <ul className='d-flex flex-wrap'>
            <li><Link to={"/"} className="black-link">Home</Link></li>
            <li><Link to={"/hair-products"} className='black-link hair-hover'>Hair Products</Link></li>
            <li><Link to={"/hair-tool"} className='black-link'>Hair Tools</Link></li>
            <li><Link to={"/gift-sets"} className='black-link'>Gifts & Sets</Link></li>
            <li><Link to={"/new"} className='black-link'>New</Link></li>
            <li><Link to={"/how-to"} className='black-link'>How To & Inspo</Link></li>
          </ul>
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-1 col-xl-1 col-xxl-1 d-flex justify-content-evenly align-items-center nav-btns p-0">
          <button className="btn p-0 d-block d-md-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu" aria-controls="offcanvasMenu"><FiMenu /></button>
          <button className="btn p-0" type="button" data-bs-toggle="offcanvas" onClick={GetData} data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><CiShoppingCart /></button>
           <Link to={"/login"}><CiUser /></Link>
        </div>
      </div>

      {/* First Offcanvas - Cart */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Cart Page...</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          {cart ?
            data.map((el) => (
              <div className='pros' key={el.id}>
                <img src={el.img} alt="" />
                <h5>{el.heading}</h5>
                <p>${el.price}</p>
                <div className="d-flex justify-content-center gap-5">
                  <button onClick={() => delData(el.id)} className='del-btn'><MdDelete />Delete</button>
                  <div className="box">
                    <button onClick={() => handleQty("dec", el.id)}><FaMinus /></button>
                    {el.qty}
                    <button onClick={() => handleQty("inc", el.id)}><FaPlus /></button>
                  </div>
                </div>
              </div>
            )) : (
              <div className='d-flex align-items-center justify-content-center'>
                <img src={img} alt="" />
                Your Cart Is Empty
              </div>
            )}
          <div className="lane mt-3 d-flex justify-content-center gap-3">
            <h4>Total:</h4>
            <h4>${sum}</h4>
          </div>
        </div>
      </div>

      {/* Second Offcanvas - Menu or Additional Content */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasMenu" aria-labelledby="offcanvasMenuLabel">
        <div className="offcanvas-header">
          <h5 id="offcanvasMenuLabel">Menu</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className='d-flex flex-column align-items-center'>
            <li><Link to={"/"} className="black-link">Home</Link></li>
            <li><Link to={"/hair-products"} className='black-link hair-hover'>Hair Products</Link></li>
            <li><Link to={"/hair-tool"} className='black-link'>Hair Tools</Link></li>
            <li><Link to={"/gift-sets"} className='black-link'>Gifts & Sets</Link></li>
            <li><Link to={"/new"} className='black-link'>New</Link></li>
            <li><Link to={"/how-to"} className='black-link'>How To & Inspo</Link></li>
          </ul>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Navbar;
