// Import necessary React hooks and components
import React, { useContext, useEffect, useState } from 'react';

// Import the shared context that provides access to product data
import { ShopContext } from '../context/ShopContext';

// Import a reusable Title component for section headings
import Title from '../components/Title';

// Import a reusable ProductItem component to display individual product cards
import ProductItem from '../components/ProductItem';

// Import Link from react-router-dom to enable navigation
import { Link } from 'react-router-dom';

// Define the RelatedProducts component, receiving `category` and `subCategory` as props
const RelatedProducts = ({ category, subCategory }) => {
  // Access the global `products` array from ShopContext
  const { products } = useContext(ShopContext);

  // Local state to store the filtered list of related products
  const [related, setRelated] = useState([]);

  // useEffect runs whenever `products`, `category`, or `subCategory` change
  useEffect(() => {
    // Only proceed if products have been loaded
    if (products.length > 0) {
      // Filter products that match both the category and subCategory
      const filtered = products
        .filter(item => item.category === category && item.subCategory === subCategory)
        .slice(0, 5); // Limit to the first 5 matching items

      // Update the local state with the filtered products
      setRelated(filtered);
    }
  }, [products, category, subCategory]); // Dependencies: re-run when any of these change

  // Render the related products section
  return (
    <div className='my-24'> {/* Margin top and bottom spacing */}
      <div className='text-center text-3xl py-2 text-emerald-800'>
        {/* Section title using the reusable Title component */}
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      {/* Responsive grid layout for displaying product cards */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {/* Map through the filtered related products and render each one */}
        {related.map((item, index) => (
          <Link to={`/product/${item._id}`} key={index}> {/* Navigate to product page on click */}
            <ProductItem
              id={item._id} // Product ID
              name={item.name} // Product name
              price={item.price} // Product price
              image={item.image} // Product image URL
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

// Export the component for use in other parts of the app
export default RelatedProducts;