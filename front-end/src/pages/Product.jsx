// Import React hooks and components
import React, { useContext, useEffect, useState } from 'react';

// Import useParams to extract dynamic route parameters (e.g., productId from URL)
import { useParams } from 'react-router-dom';

// Import shared context to access global product and currency data
import { ShopContext } from '../context/ShopContext';

// Import static assets like icons
import { assets } from '../assets/assets';

// Import the RelatedProducts component to show similar items
import RelatedProducts from '../components/RelatedProducts';

// Define the Product component
const Product = () => {
  // Extract productId from the URL using React Router
  const { productId } = useParams();

  // Access products and currency from global ShopContext
  const { products, currency } = useContext(ShopContext);

  // Local state to hold the selected product's data
  const [productsData, setProductsData] = useState(false);

  // Local state to hold the currently displayed image
  const [image, setImage] = useState('');

  // Local state to hold the selected size
  const [size, setSize] = useState('');

  // Function to find and set product data based on productId
  const fetchProductsData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductsData(item);         // Set the full product data
        setImage(item.image[0]);       // Set the default image to the first one
        return null;                   // Exit the loop early
      }
    });
  };

  // Run fetchProductsData whenever productId changes
  useEffect(() => {
    fetchProductsData();
  }, [productId]);

  // Render the product page only if productsData is available
  return productsData ? (
    <div className='border-t-2 border-amber-300 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      
      {/* Product data section */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Product image gallery */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          
          {/* Thumbnail images (clickable) */}
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.5%] w-full'>
            {productsData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)} // Update main image on click
                src={item}
                alt=""
                key={index}
                className='w-[25%] sm:w-full sm:mb-3 shrink-0 cursor-pointer'
              />
            ))}
          </div>

          {/* Main product image */}
          <div className='w-full sm:w-[80%]'>
            <img src={image} alt="" className='w-full h-auto' />
          </div>
        </div>

        {/* Product information section */}
        <div className='flex-1 text-emerald-800'>
          {/* Product name */}
          <h1 className='font-medium text-2xl mt-2'>{productsData.name}</h1>

          {/* Star rating and review count */}
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className='pl-2'>(120)</p>
          </div>

          {/* Price display */}
          <p className='mt-5 text-3xl font-medium'>
            {currency} {productsData.price}
          </p>

          {/* Product description */}
          <p className='mt-5 text-gray-500 md:w-4/5'>{productsData.description}</p>

          {/* Size selection buttons */}
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productsData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)} // Update selected size
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? 'bg-orange-500' : ''}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart button */}
          <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>
            ADD TO CART
          </button>

          {/* Divider line */}
          <hr className='mt-8 sm:w-4/5' />

          {/* Additional product policies */}
          <div className='text-sm text-emerald-800 mt-5 flex flex-col gap-1'>
            <p>100% Original product</p>
            <p>Cash on delivery is not available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description and Reviews section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews</p>
        </div>

        {/* Static description content */}
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-emerald-800 mt-10'>
          <p>
            A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart...
          </p>
          <p>
            The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog.
          </p>
        </div>
      </div>

      {/* Related products section */}
      <RelatedProducts
        category={productsData.category}
        subCategory={productsData.subCategory}
      />
    </div>
  ) : (
    // Fallback UI while product data is loading
    <div className='opacity-0'></div>
  );
};

// Export the Product component for use in routing or other components
export default Product;

{/*3hrs 25min */}