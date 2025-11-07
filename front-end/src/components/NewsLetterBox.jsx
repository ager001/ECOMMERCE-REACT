import React from 'react'

const NewsLetterBox = () => {
//This code makes sure that when we submit the form it doesn't reload the page
    const onSubmitHandler = (event) =>{
            event.preventDefault();
    }


  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-emerald-800'>
            Subscribe now & get 20% off
        </p>

        <p className='text-emerald-400'>
            Shop with us
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input type="email" placeholder='Enter your email' 
            className='w-full sm:flex-1 outline-none'  required/>
            <button type='submit'
            className='bg-amber-500 text-black text-xs px-10 py-4'>Subscribe</button>
        </form>
      
    </div>
  )
}

export default NewsLetterBox
