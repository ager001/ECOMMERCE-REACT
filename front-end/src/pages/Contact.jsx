import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'





const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-amber-300 border-t'>
           <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-20'>
              <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
              <div className='flex flex-col justify-center items-start gap-6'>
                <p className='font-semibold text-xl text-emerald-600'>Our store</p>
                <p className='text-gray-500'>Kimathi Street <br /> Nairobi CBD, Kenya</p>
                <p className='text-gray-500'>Tell: (+254)759952973 <br /> Email: agermidenga@gmail.com</p>
              </div>
      </div>

      <NewsLetterBox/>
    </div>
  )
}

export default Contact
