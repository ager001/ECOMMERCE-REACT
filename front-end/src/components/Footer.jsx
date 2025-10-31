import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div >
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap 14 my-10 mt-40 text-sm  text-emerald-900 '>

            <div>
                <img src={assets.logo} alt="" 
                className='mb-5 w-32'/>
                <p className='w-full md:w-2/3 text-emerald-600'>
                    The best online store in the country
                </p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5 text-emerald-900'>
                    COMPANY
                </p>
                <ul className='flex flex-col gap-1 cursor-pointer' >
                    <Link to={'/'}><li className=' hover:text-red-600 '>Home</li></Link>
                    <Link to={'/about'}><li className=' hover:text-red-600 '>About Us</li></Link>
                    <li className=' hover:text-red-600 '>Delivery</li>
                    <li className=' hover:text-red-600 '>Privacy Policy</li>

                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1'>
                       <li>+25475666556</li>
                       <li>mkuu@gmail.com</li>
                </ul>
            </div>

      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
            Copyright &copy; {new Date().getFullYear()} websitename.com - All rights Reserved
        </p>

      </div>
    </div>
  )
}

export default Footer
