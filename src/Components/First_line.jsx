import React from 'react'
import { FaTruck } from 'react-icons/fa';
import { IoMdPhonePortrait } from 'react-icons/io';
import { LuCoins } from 'react-icons/lu';

const First_line = () => {
    return (
        <div>
            <div className="first-line d-flex justify-content-center gap-3 align-items-center">
                <div className="one">
                    <FaTruck />
                    <span className='p-3'>Free Shipping on all Purchases</span>
                </div>
                <div className="second">
                    <LuCoins />
                    <span className='p-3'>60 Day Return Policy</span>
                </div>
                <div className="third">
                    <IoMdPhonePortrait />
                    <span className='p-3'>Subscribe for Special Offers</span>
                </div>
            </div>
        </div>
    )
}

export default First_line
