import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'

// Define a functional component named Cart
const Cart = () => {

  // Destructure values from the ShopContext using React's useContext hook.
  // This gives access to shared state: currency, products, and cartItems.
  const { currency, products, cartItems, updateQuantity, navigate} = useContext(ShopContext);

  // Declare a state variable cartData to hold processed cart information.
  // Initially set to an empty array.
  const [cartData, setCartData] = useState([]);

  // useEffect hook runs whenever cartItems changes.
  // Its purpose is to transform the cartItems object into a structured array.
  useEffect(() => {
    // Temporary array to hold transformed cart data
    const tempData = [];

    // Outer loop: iterate over each product ID in cartItems
    for (const items in cartItems) {
      // Inner loop: iterate over each size variant for the current product
      for (const item in cartItems[items]) {
        // Check if the quantity for this size is greater than 0
        if (cartItems[items][item] > 0) {
          // Add a new object to tempData with product ID, size, and quantity
          tempData.push({
            _id: items,                     // Product ID
            size: item,                    // Size variant
            quantity: cartItems[items][item] // Quantity selected
          });
        }
      }
    }

    // Update the cartData state with the transformed array
    setCartData(tempData);
  }, [cartItems]); // Dependency array ensures the effect runs when cartItems changes

  // Return the JSX structure for the Cart component
  return (
    // Outer container with top border and padding
    <div className='border-t pt-14 border-amber-300'>

      {/* Title section with styled text */}
      <div className='text-2xl mb-3 text-emerald-800'>
        {/* Render the Title component with props passed using braces */}
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* Container for cart items */}
      <div>
        {
          // Use map to iterate over cartData array
          cartData.map((item, index) => {
            // Find the product details by matching _id
            const productData = products.find((product) => product._id === item._id);

            // Return JSX for each cart item
            return (
              // Each cart item row with grid layout and styling
              <div
                key={index} // Use index as key (acceptable if list is static)
                className='py-4 border-t border-b text-emerald-800 grid grid-cols-[4fr_2fr_1fr_auto] items-center gap-4'
              >
                {/* First column: product image */}
                <div className='flex items-start gap-6'>
                  <img
                    src={productData.image[0]} // Access first image from productData
                    alt={productData.name}     // Use product name for accessibility
                    className='w-16 sm:w-20'   // Responsive width
                  />
                </div>

                {/* Second column: product name and size */}
                <div className='flex items-center gap-5 mt-2'>
                  <p className='text-xs sm:text-lg font-medium'>
                    {productData.name}
                  </p>
                  <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>
                  {item.size}
                  </p>
                </div>

                {/* Third column: quantity and price */}
                <div>
                  <p className='text-xs sm:text-lg font-semibold'>
                    Quantity: {item.quantity}
                  </p>
                  <p className='text-sm mt-1'>
                    {currency}{productData.price}
                  </p>
                </div>

                {/* Fourth column: bin icon aligned to the right */}
                <div className='flex justify-end'>
                  <img
                    onClick={()=>updateQuantity(item._id, item.size,0)}
                    className='w-4 sm:w-5 cursor-pointer'
                    src={assets.bin_icon}     // Bin icon image source
                    alt="Remove item"         // Alt text for accessibility
                    title="Remove item"       // Tooltip on hover
                  />
                </div>
              </div>
            );
          })
        }
      </div>
          <div className='flex justify-end my-20'>
               <div className='w-full sm:w-full'>
                  <CartTotal/>
                   <div className='w-full text-end' >
              <button onClick={()=>navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer'>
                Proceed to CheckOut
              </button>
              
           </div>
               </div>
          </div>

    </div>
  );
}

export default Cart