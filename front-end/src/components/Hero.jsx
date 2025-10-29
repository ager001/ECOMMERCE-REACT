import React from 'react'
import {assets} from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-amber-200'>
      {/*left side of the hero */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-emerald-800'>
            <div className='flex items-center gap-2'>
                <p className='w-8 md:w-11 h-0.5 bg-amber-950 '></p>
                <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>

            </div>
            <h1 className=' quintessential-regular  text-3xl sm:py-3 lg:text-5xl loading-relaxed'>Latest Arrivals</h1>
            <div className='flex items-center gap-2'>
                <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                <p className='w-8 md:w-11 h-0.5 bg-amber-950 '></p>

            </div>
        </div>

      </div>

       {/*right side of the hero */}
        <img className='w-full sm:w-1/2'  src={assets.hero_img} alt="" />

    </div>
  )
}

export default Hero
