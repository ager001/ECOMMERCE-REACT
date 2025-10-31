import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';



// Define a functional React component named ProductItem
// It receives props using object destructuring: id, image, name, and price
// Using this ProductItem we will display product in the latest collection section
const ProductItem = ({id, image, name, price}) => {
  //Destructuring only the currency from the ShopContext
      const {currency} = useContext(ShopContext);
  
    return (
    <Link className='text-emerald-800 cursor-pointer'   to={`/product/${id}`}>
      

     <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />

     </div>
     <p className='pt-3 pb-1 text-sm'>{name}</p>
     <p className='text-sm font-medium'>{currency} {price}</p>


    </Link>
  )
}

export default ProductItem
