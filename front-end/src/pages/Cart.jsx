import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { currency, products, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];

      // Loop through cartItems to build cartData
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          const quantity = cartItems[productId][size];

          if (quantity > 0) {
            const productExists = products.some(product => product._id === productId);

            if (productExists) {
              tempData.push({
                _id: productId,
                size: size,
                quantity: quantity
              });
            } else {
              console.warn(`Skipping invalid product ID: ${productId}`);
              // Optional: remove from cart state here if you want to clean it permanently
              // updateQuantity(productId, size, 0);
            }
          }
        }
      }

      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className='border-t pt-14 border-amber-300'>
      <div className='text-2xl mb-3 text-emerald-800'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find(product => product._id === item._id);

          if (!productData) {
            console.warn(`Product with ID ${item._id} not found in products list.`);
            return null;
          }

          return (
            <div
              key={index}
              className='py-4 border-t border-b text-emerald-800 grid grid-cols-[4fr_2fr_1fr_auto] items-center gap-4'
            >
              <div className='flex items-start gap-6'>
                <img
                  src={productData.image[0]}
                  alt={productData.name}
                  className='w-16 sm:w-20'
                />
              </div>

              <div className='flex items-center gap-5 mt-2'>
                <p className='text-xs sm:text-lg font-medium'>
                  {productData.name}
                </p>
                <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>
                  {item.size}
                </p>
              </div>

              <div>
                <p className='text-xs sm:text-lg font-semibold'>
                  Quantity: {item.quantity}
                </p>
                <p className='text-sm mt-1'>
                  {currency}{productData.price}
                </p>
              </div>

              <div className='flex justify-end'>
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className='w-4 sm:w-5 cursor-pointer'
                  src={assets.bin_icon}
                  alt="Remove item"
                  title="Remove item"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-full'>
          <CartTotal />
          <div className='w-full text-end'>
            <button
              onClick={() => navigate('/place-order')}
              className='bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer'
            >
              Proceed to CheckOut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;