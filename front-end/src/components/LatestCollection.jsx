import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const {products} = useContext(ShopContext);
    {/*Here I have created a state that loads 10 latest products in the page. 
        We also have to create a useEffect function that loads the 10 products and will be executed once the
        component is loaded */}
    
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(()=>{
          setLatestProducts(products.slice(0,10))
    },[products]);

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTIONS'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-emerald-800'>
              Welcome the following displayed products are in our latest collection
            </p>

        </div>
      
      {/*Rendering products in our page
      We have passed all props to be rendered as the way they are in the ProductItem.jsx */}
      
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
             {
              latestProducts.map((item, index)=>(
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
              ))
             }
      </div>


    </div>
  )
}

export default LatestCollection
