import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
   
    const {products} = useContext(ShopContext);
    // Accessing the products array from context

    const [bestSeller, setBestSeller] = useState([]);
    // Local state to store the filtered best-selling products


    useEffect (()=>{
        // This effect runs whenever the 'products' array changes


        const bestProduct = products.filter((item)=>(item.bestseller));
        // Filters products that have the 'bestSeller' flag set to true

        setBestSeller(bestProduct.slice(0,5))
         // Stores the first 5 best-selling products in state


    },[products])
    // Dependency array ensures the effect runs when 'products' updates


  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLERS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-emerald-600'>
        These are among the best selling products that we have in store, grab them before they're gone!
        </p>
      
    </div>
     
     <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4gap-y-6'>
            {
                bestSeller.map((item,index)=>(
                    //Here I am destructuring props that were defined in the ProductItem.jsx
                    <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
                ))
            }
     </div>

    </div>
    
  )
}

export default BestSeller
