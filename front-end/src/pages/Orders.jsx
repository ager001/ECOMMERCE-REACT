// Import React and the useContext hook to access shared state from context
import React, { useContext, useEffect, useState } from 'react'

// Import the ShopContext to access global product and currency data
import { ShopContext } from '../context/ShopContext'

// Import a reusable Title component for section headings
import Title from '../components/Title'
import axios from 'axios'




// Define the Orders component
const Orders = () => {

  // Destructure `products` and `currency` from the ShopContext
  // `products` is an array of product objects
  // `currency` is a string representing the current currency symbol (e.g., KES, $, €)
  const { backendUrl, token,  currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () =>{
    try {
      if (!token) {
          return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, {headers:{token}})
      console.log(response.data);
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
      loadOrderData()
  },[token])



  // Return the JSX layout for the Orders page
  return (
    // Outer container with top border and padding
    <div className='border-t pt-16'>

      {/* Section heading */}
      <div className='text-2xl'>
        {/* Render the Title component with "MY ORDERS" */}
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {/* Orders list container */}
      <div>
        {
          // Slice the products array to simulate 3 recent orders (from index 1 to 3)
          orderData.map((item, index) => (
            // Each order item container with border and responsive layout
            <div
              key={index} // Unique key for React's rendering optimization
              className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
            >
              {/* Left section: product image and details */}
              <div className='flex items-start gap-6 text-sm'>
                
                {/* Product thumbnail image */}
                <img
                  src={item.image[0]} // Use the first image from the product's image array
                  alt="" // No alt text provided (can be improved for accessibility)
                  className='w-16 sm:w-20' // Responsive width
                />

                {/* Product details */}
                <div>
                  {/* Product name */}
                  <p className='sm:text-base font-medium text-emerald-800'>{item.name}</p>

                  {/* Price, quantity, and size info */}
                  <div className='flex items-center gap-3 mt-2 text-base text-emerald-800'>
                    <p className='text-lg'>{currency} {item.price}</p> {/* Price with currency */}
                    <p>Quantity: {item.quantity}</p> {/* Static quantity (can be dynamic later) */}
                    <p>Size: {item.size} </p> {/* Static size (can be dynamic later) */}
                  </div>

                  {/* Order date using current date formatted for Kenya */}
                  <p className='mt-2'>
                    Date: <span className='text-emerald-500'>{new Date().toLocaleDateString('en-KE')}</span>
                  </p>
                </div>
              </div>

              {/* Right section: order status and action button */}
              <div className='md:w-1/2 flex justify-between'>

                {/* Order status indicator */}
                <div className='flex items-center gap-2'>
                  {/* Green dot indicating status */}
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  {/* Status label */}
                  <p className='text-sm md:text-base'>Ready to ship</p>
                </div>

                {/* Track Order button (non-functional placeholder) */}
                <button className='border px-4 py-2 text-sm font-medium rounded-sm'>
                  Track Order
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

// Export the Orders component so it can be used in routing or other components
export default Orders