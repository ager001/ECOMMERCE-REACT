import React from 'react'
import Title from '../components/Title'
import{assets} from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>

      <div className='text 2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
            <img src={assets.about_img} alt=""
            className='w-full md:max-w-[450px]' />
            <div className='flex flex-col justify-center gap-6 md:w-2/4 text-emerald-800'>
              <p>Dummy text</p>
              <p>Dummy text 2</p>
              <b className='text-gray-800'>Our Mission</b>
              <p>To be the best online clothing store and to deliver quality products</p>
            </div>
      </div>
      <div className='text-2xl py-4'>

        <Title text1={'WHY'} text2={'CHOOSE US'}/>

      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
           <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
              <b>Quality Assurance:</b>
              <p className='text-emerald-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
           </div>
           <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
              <b>Convenience:</b>
              <p className='text-emerald-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
           </div>
           <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
              <b>Exceptional Customer Service:</b>
              <p className='text-emerald-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
           </div>
      </div>

      <NewsLetterBox/>
      
    </div>
  )
}

export default About
