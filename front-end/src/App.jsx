import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Product from './pages/Product'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import NavBar from './components/NavBar'



const App = () => {
  return (
    
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      {/* 
    This div has horizontal padding that adjusts responsively:
    - px-4: Default padding on both left and right (1rem each side)
    - sm:px-[5vw]: On small screens and up, padding becomes 5% of the viewport width
    - md:px-[7vw]: On medium screens and up, padding increases to 7% of viewport width
    - lg:px-[9vw]: On large screens and up, padding increases to 9% of viewport width
    This ensures the content has breathing room and adapts nicely across screen sizes.
  */}

       <NavBar/>
        <Routes>{/*I have created all 9 routes for my pages and their paths */}
           <Route path='/' element={<Home/>}/>
           <Route path='/collection' element={<Collection/>}/>
           <Route path='/about' element={<About/>}/>
           <Route path='/cart' element={<Cart/>}/>
           <Route path='/contact' element={<Contact/>}/>
           <Route path='/product/:productId' element={<Product/>}/>
           <Route path='/login' element={<Login/>}/>
           <Route path='/place-order' element={<PlaceOrder/>}/>
           <Route path='/orders' element={<Orders/>}/>
           
        </Routes>
     
    </div>
  )
}

export default App
