import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const LatestCollection = () => {

    const {products} = useContext(ShopContext);
    {/*Here I have created a state that loads 10 latest products in the page. 
        We also have to create a useEffect function that loads the 10 products and will be executed once the
        component is loaded */}
    
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(()=>{
          setLatestProducts(products.slice(0,10))
    },[]);

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTIONS'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-emerald-800'>
              Welcome the following displayed products are in our latest collection
            </p>

        </div>
      


    </div>
  )
}

export default LatestCollection
